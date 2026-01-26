# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a modern portfolio website built with **Vite + React + TypeScript**. It showcases a freelance web developer's projects, services, and skills with a neon-styled dark theme and animated components.

## Build & Development Commands

```bash
# Start development server (port 3000, auto-opens in browser)
npm run dev

# Build for production (outputs to build/ directory)
npm run build

# Deploy to GitHub Pages (runs build first, then pushes to gh-pages branch)
npm run deploy
```

### Environment Setup
Create a `.env` file in the project root with EmailJS credentials (required for contact form):
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Radix UI component library (shadcn/ui)
│   ├── figma/                 # Custom components (e.g., ImageWithFallback)
│   ├── App.tsx                # Root component (page sections: Hero → Contact → Footer)
│   ├── Navigation.tsx         # Header navigation
│   ├── Hero.tsx               # Hero section with intro and CTA
│   ├── About.tsx              # About section
│   ├── Skills.tsx             # Skills/tech stack section
│   ├── Projects.tsx           # Portfolio projects with pagination and modal
│   ├── Services.tsx           # Services offered
│   ├── Contact.tsx            # Contact form (uses EmailJS)
│   └── Footer.tsx             # Footer
├── styles/
│   └── globals.css            # Tailwind CSS theme setup, custom utilities (neon-glow, glass-morphism)
├── img/                       # Project images and assets
├── guidelines/                # Design guidelines
├── main.tsx                   # Entry point
└── index.html                 # HTML template
```

## Key Architecture & Design System

### Component Structure
- **Single-page layout** with semantic sections in `App.tsx`
- **Radix UI** provides accessible, unstyled components
- **shadcn/ui** pattern: component library in `src/components/ui/` with Tailwind styling
- **Framer Motion** for smooth animations (imported as `motion/react`)

### Design System (globals.css)
- **Dark theme only** (set via `document.documentElement.classList.add('dark')` in App.tsx)
- **Custom CSS variables** for:
  - Base palette: primary (#8a2be2 - purple), secondary (#ff6bff - pink)
  - Neon effects: `--neon-glow`, `--neon-primary`, `--neon-secondary`
  - Glass-morphism: `--glass-bg`, `--glass-border`
- **Custom Tailwind utilities**:
  - `.neon-glow` / `.neon-glow-sm` - box-shadow with neon glow
  - `.neon-border` - purple border with glow effect
  - `.glass-morphism` - frosted glass background with blur

### Key Dependencies
- **React** 18.3.1
- **Vite** 6.3.5 with SWC compiler (@vitejs/plugin-react-swc for speed)
- **Tailwind CSS** with `@theme inline` configuration
- **Radix UI** components (extensive suite for accessibility)
- **Framer Motion** (motion library) for animations
- **lucide-react** for icons
- **EmailJS** for contact form submissions
- **Recharts** for chart displays
- **react-hook-form** for form state management
- **react-resizable-panels** for layout flexibility

### Important Configuration Details

**vite.config.ts:**
- Base path: `/portfolio-iguercha-louis/` (GitHub Pages subfolder deployment - **change if hosting URL changes**)
- Output dir: `build/` (not `dist/`)
- Dev server: port 3000, auto-opens browser
- **Radix UI Package Aliases**: All ~25 Radix UI packages have explicit version aliases to resolve version conflicts
  - If adding a new Radix UI dependency, add its alias to `resolve.alias` mapping the versioned name to unversioned (e.g., `'@radix-ui/react-new-component@X.X.X': '@radix-ui/react-new-component'`)

**globals.css:**
- **Tailwind Configuration**: Uses `@theme inline` (Tailwind 4+ syntax) to define all colors, spacing, and custom utilities
  - No separate `tailwind.config.ts` file - all Tailwind config is in this CSS file using CSS custom properties
  - Modify custom theme values by editing `:root` CSS variables (lines 3-49)
- `.dark` class applied to html element (enforced in App.tsx)
- Smooth scrolling enabled via `html { scroll-behavior: smooth; }`
- Base typography layer for headings, paragraphs, inputs (auto-applied when no explicit text class is used)
- Custom utilities in base layer: `.neon-glow`, `.neon-glow-sm`, `.neon-border`, `.glass-morphism`

## Common Tasks

### Adding a New Project to Portfolio
1. Edit [Projects.tsx](src/components/Projects.tsx) - add object to `projects` array with:
   - `id`: unique identifier (string)
   - `title`: project name
   - `category`: project type (e.g., "Web Development", "Mobile", "AI")
   - `description`: short one-liner
   - `longDescription`: detailed description shown in modal
   - `tags`: array of technology/skill tags
   - `image`: filename in `src/img/`
   - `link`: external project URL or live demo
   - `github`: GitHub repository URL
   - `features`: array of key features (shown in modal)
2. Image should be in `src/img/`
3. Component has built-in pagination (displays 3 items per page, with next/previous navigation)
4. Modal displays full project details when clicked, triggered by CardContent interaction

### Updating Contact Form
- Located in `src/components/Contact.tsx`
- Uses **EmailJS** for submissions
- Check `.env` for EmailJS credentials (service_id, template_id, public_key)

### Modifying Design/Colors
- Edit `src/styles/globals.css` - update CSS variables in `:root` or `.dark` block
- Primary neon color: `--primary: #8a2be2`
- Secondary neon color: `--secondary: #ff6bff`
- All UI components will update automatically (Tailwind classes reference these variables)

### Building for Production
```bash
npm run build
# Check output in build/ directory
# To test build locally: serve build/ with any http server
```

## Notes

### Design & Deployment
- **Dark mode only** - no light theme toggle implemented (always dark on app load)
- **GitHub Pages deployment** - base path is hardcoded in vite.config.ts; update if hosting URL changes
- **Animation library** - Framer Motion imported as `motion/react` (re-exported package name, not `framer-motion`)

### Component Development
- **Component library** - most UI components in `src/components/ui/` are generated via shadcn/ui pattern from Radix UI
  - Don't edit these files directly unless fixing a specific issue
  - If updating a component, re-generate via shadcn CLI if available, or manually update matching the existing pattern

### Build & Environment
- **EmailJS** - contact form requires valid EmailJS credentials in environment variables (`.env` file)
- **SWC compiler** - used via @vitejs/plugin-react-swc for faster builds; fully compatible with TypeScript
- **No type checking** - no `tsc` or type-checking build step; TypeScript is transpiled by SWC only
- **No linting/formatting** - no ESLint, Prettier, or other linting setup
- **No testing** - no test framework (Jest, Vitest, etc.) configured
