# Portfolio Profile Configuration Guide

An electric-blue accent dark framework portfolio built with pure HTML and Tailwind CSS layout paradigms. Inspired directly by Charan Raj Katta's minimalistic scannable layout strategy.

## 🛠 Step-by-Step Customization Setup

### 1. Update Core Bio & Information
Open up `index.html` inside your code editor and look for the capitalized `<!-- CHANGE THIS: ... -->` comment markers.
* Change structural text blocks including the page `<title>`, header titles, and education/institute tags dynamically.

### 2. Configure Your 10 Skills Slots
* Scroll to the `<!-- SKILLS SECTION -->` block.
* You will find 10 clean text badge containers (`<span>`). Change the string tags internally to switch tools out seamlessly.

### 3. Customize Your 5 Project Slots
* Go to the `<!-- FEATURED PROJECTS SECTION -->` block. 
* Inside each of the 5 rounded component cards, change the title, description paragraph, and the link target variables.

### 4. Swap Out Your Certifications (15 + 15 Blocks)
* Look for the `<!-- INTERNSHIP CERTIFICATES SUB-SECTION -->` column container. Fill slots 1 through 15 with corporate dates and tags.
* Look for the `<!-- COURSE CERTIFICATES SUB-SECTION -->` column block directly adjacent to it. Fill your remaining 15 learning slots inside it.

### 5. Hooking up the Contact Message Box
The form block contains a ready-made structure to securely email users straight out of static web pages.
1. Visit [Formspree](https://formspree.io/) and create a free account.
2. Form a target endpoint URL and replace `https://formspree.io/f/YOUR_FORMSPREE_ID` directly inside your portfolio's code.

## 🚀 Going Live via GitHub Pages
1. Push your finalized project code onto your public profile code repository named exactly: `mohammeduzairullah.github.io`.
2. Ensure file indexing configurations point directly to the base `index.html` filename.
3. Open up Repository Settings -> navigate to **Pages** -> ensure the source deployment points to the `main` branch root, click Save. Your portfolio is now globally accessible!
