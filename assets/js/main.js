document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile nav toggle ---------- */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        const setOpen = (open) => {
            hamburger.classList.toggle('open', open);
            mobileMenu.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', String(open));
        };
        hamburger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('open')));
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen(!mobileMenu.classList.contains('open'));
            }
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setOpen(false));
        });
    }

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const reveal = (el) => el.classList.add('in-view');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        reveal(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            revealEls.forEach(el => observer.observe(el));
            // Safety net: guarantee visibility even if the observer never fires
            // (e.g. inside an embedded webview that doesn't run a compositor step).
            setTimeout(() => revealEls.forEach(reveal), 1500);
        } else {
            revealEls.forEach(reveal);
        }
    }

    /* ---------- Back to top ---------- */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Cursor glow (pointer devices only) ---------- */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
        window.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.style.opacity = '1';
        });
        document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    }

    /* ---------- Tilt effect on cards (pointer devices only) ---------- */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    /* ---------- Role cycler (home page hero) ---------- */
    const roleEl = document.getElementById('role-cycle');
    if (roleEl) {
        let roles = [];
        try { roles = JSON.parse(roleEl.getAttribute('data-roles')); } catch (e) { roles = []; }
        if (roles.length > 1) {
            let i = 0;
            setInterval(() => {
                roleEl.classList.add('fade');
                setTimeout(() => {
                    i = (i + 1) % roles.length;
                    roleEl.textContent = roles[i];
                    roleEl.classList.remove('fade');
                }, 350);
            }, 2600);
        }
    }

    /* ---------- Copy to clipboard ---------- */
    const toast = document.getElementById('toast');
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
    }
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const value = btn.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(value);
                showToast('Copied to clipboard');
            } catch (e) {
                showToast('Copy failed — please copy manually');
            }
        });
    });

    /* ---------- Certificate search filter ---------- */
    const certSearch = document.getElementById('cert-search');
    if (certSearch) {
        const items = document.querySelectorAll('[data-cert-item]');
        certSearch.addEventListener('input', () => {
            const q = certSearch.value.trim().toLowerCase();
            items.forEach(item => {
                const match = item.textContent.toLowerCase().includes(q);
                item.style.display = match ? '' : 'none';
            });
        });
    }

    /* ---------- Scrollspy: highlight nav link for section in view ---------- */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
    if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
        const setActive = (id) => {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        };
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(section => spy.observe(section));
    }

});
