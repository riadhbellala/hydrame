# HYDRAME - Project Architecture & Analysis

This document provides a comprehensive overview of the HYDRAME project structure, components, and styling conventions. 

## 1. Project Overview
HYDRAME is a modern, interactive React single-page application built with Vite and Tailwind CSS. The design heavily features premium glassmorphism, fluid animations (via Framer Motion), and a custom color palette focused on emerald/mint greens and deep ink blues.

## 2. File Structure

### `/src` Directory
The core of the application resides here.

- `main.jsx`: The entry point that mounts the React application.
- `App.jsx`: The root component setting up React Router and the global layout wrapper, including the sticky `Footer` parallax reveal and `Navbar`.
- `index.css`: The global stylesheet containing Tailwind imports, root CSS variables (`@theme`), base tag stylings, and custom CSS classes like `.glass-card`.

### `/src/pages`
Contains the top-level route components.
- `Home.jsx`: The main landing page assembling all the sections sequentially. Includes the initial intro animation logic.
- `ProjectDetails.jsx`: The dynamic page for viewing detailed case studies of individual projects, utilizing URL parameters to fetch data.

### `/src/components/layout`
Global layout components used across pages.
- `Navbar.jsx`: A responsive, sticky navigation bar that transforms into a floating "glass pill" upon scrolling.
- `Footer.jsx`: The global footer utilizing a unique `clip-path` parallax reveal effect behind the main content wrapper.

### `/src/components/sections`
The building blocks of the `Home` page.
- `Hero.jsx`: The top landing section featuring giant typography and an overarching introduction.
- `About.jsx`: Introduces the company with staggered glass cards, utilizing Framer Motion for scroll-linked floating effects.
- `Expertise.jsx`: Details the specific technical domains the company covers.
- `Methodology.jsx`: Displays a diagonal scrolling pipeline of methodology steps utilizing `useScroll` and `useTransform`.
- `Projects.jsx`: A showcase of recent works, fetching preview data from the `projects.js` file and linking to detailed views.
- `Environmental.jsx`: Highlights the "Notre Démarche" commitments via an asymmetric bento grid layout and animated statistics.
- `Contact.jsx`: A minimalist contact form and company details section.

### `/src/components/ui`
Reusable, granular UI components and animation wrappers.
- `Intro.jsx`: Handles the cinematic opening animation via a React Portal overlay.
- `WaterWave.jsx`: Renders a canvas-based interactive fluid/wave animation.
- `ScrollReveal.jsx`: A utility wrapper to animate children fading in and moving up as they scroll into view.
- `SectionTitle.jsx`: A standardized heading component for sections.
- `GlassCard.jsx`: A reusable wrapper for the global glassmorphism style.
- `AnimatedCounter.jsx`: Animates numbers counting up from 0 to a target value (used in the Environmental section).
- `ScrollToTop.jsx`: A router utility to snap the window back to the top when navigating to a new route.

### `/src/data`
Static data stores.
- `projects.js`: Contains the JSON array of project details, including content, statistics, tags, and images for the portfolio.

## 3. Key Technical Decisions & Styling

### Styling & Glassmorphism
- **Tailwind CSS V4**: The project utilizes the new Tailwind V4 `@theme` directive in `index.css` to define a unified color palette (`--color-green-500`, `--color-ink-950`).
- **Premium Glassmorphism**: A core visual pillar of the app. Defined globally in `index.css` under the `.glass-card` class, it utilizes:
  - `backdrop-filter: blur(5px)` combined with low-opacity white backgrounds.
  - Advanced `box-shadow` techniques including deep inner drop shadows (`inset 0 0 22px 11px rgba(255,255,255,0.8)`).
  - CSS pseudo-elements (`::before`, `::after`) generating 1px linear-gradient borders to simulate real glossy glass edges.
  - A decorative radial blurred orb sits behind the `.glass-card` containers to ensure the glass has something to refract against on white backgrounds.

### Animations
- **Framer Motion**: Used extensively across the application.
  - `useScroll` and `useTransform`: Utilized in `Methodology.jsx` and `About.jsx` to map scroll position directly to element transformations (parallax scrolling).
  - `AnimatePresence`: Used in `Intro.jsx` to orchestrate unmounting animations.

### Typography
- **Urbanist**: Configured globally for all headings (`h1` through `h6`) to give a modern, geometric look.
- **Inter**: Used for all body copy to maintain readability.
