# Pollinate - Interactive 3D Web Experience

Pollinate is a bold, scroll-driven 3D web experience featuring a bee model animated with WebGL and GSAP. It blends high-impact motion design with modern front-end performance practices.

Live demo: https://oniko-io.github.io/Pollinate/

## Features

- Scroll-driven 3D animation synced to page sections
- GSAP motion choreography with smooth easing
- Responsive layout for desktop, tablet, and mobile
- Loading overlay with progress feedback and error fallback
- Mobile-friendly rendering with capped device pixel ratio
- Reduced-motion support for accessibility

## Tech Stack

- Three.js (WebGL rendering)
- GSAP (animation timing)
- HTML + CSS + JavaScript (static site)

## Project Structure

```
Pollinate/
├── index.html                 # Main HTML file
├── js/
│   └── app.js                # 3D scene and scroll logic
├── assets/
│   ├── styles/
│   │   └── style.css         # Global styles
│   ├── images/
│   │   ├── bg.png            # Background image
│   │   ├── flower.png        # Decorative flower
│   │   ├── leaf.png          # Decorative leaf
│   │   ├── leaf1.png         # Additional leaf decoration
│   │   └── favicon.svg       # Site favicon
│   └── models/
│       └── demon_bee_full_texture.glb  # 3D bee model
├── robots.txt                 # Search crawler rules
├── sitemap.xml                # Search crawler sitemap
├── package.json               # Project metadata
├── README.md                  # This file
└── .gitignore                 # Git configuration
```

## Getting Started

### Prerequisites
- A modern browser with WebGL support
- Python 3+ (for local development server)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/oniko-io/Pollinate.git
   cd Pollinate
   ```

2. Start a local server:
   ```bash
   npm start
   # or
   python -m http.server 8000
   ```

3. Open in browser:
   ```
   http://localhost:8000
   ```

## Scripts

- `npm start`: start a local dev server
- `npm run build`: no-op build placeholder
- `npm run deploy`: no-op deploy placeholder

## Deployment

This is a static site and can be hosted anywhere. For GitHub Pages:

1. Push to the default branch.
2. In GitHub Pages settings, set the source to the root of the `main` branch.
3. Update the canonical, OG tags, and sitemap URLs if the domain changes.

## Customization

- Colors: edit `assets/styles/style.css`
- Animation timing: update GSAP durations in `js/app.js`
- Bee positions: adjust the `arrPositionModel` array in `js/app.js`
- Fonts: update font imports in `assets/styles/style.css`

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Any modern browser with WebGL support

## License

MIT License.

## Author

Created by oniko.
