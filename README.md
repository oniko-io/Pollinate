# Pollinate - Interactive 3D Web Experience

A cutting-edge 3D web experience featuring scroll-driven animation of a bee model. This project demonstrates advanced web technologies including WebGL, modern animation techniques, and responsive design.

## 🎨 Features

- **Interactive 3D Animation**: Dynamic bee model that responds to scroll position
- **Smooth Motion Design**: GSAP-powered animations with fluid transitions
- **WebGL Rendering**: Built with Three.js for high-performance 3D graphics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Efficient rendering with automatic cleanup

## 🛠 Technology Stack

- **Three.js**: 3D rendering engine
- **GSAP**: Animation library for smooth tweens
- **WebGL**: Hardware-accelerated graphics

## 📁 Project Structure

```
Pollinate/
├── index.html                 # Main HTML file
├── js/
│   └── app.js                # Main application logic
├── assets/
│   ├── styles/
│   │   └── style.css         # Global styles
│   ├── images/
│   │   ├── bg.png            # Background image
│   │   ├── flower.png        # Decorative flower
│   │   ├── leaf.png          # Decorative leaf
│   │   └── leaf1.png         # Additional leaf decoration
│   └── models/
│       └── demon_bee_full_texture.glb  # 3D bee model
├── package.json              # Project metadata
├── README.md                 # This file
└── .gitignore               # Git configuration
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser with WebGL support
- Python 3+ (for local development server)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/oniko/pollinate.git
   cd pollinate
   ```

2. **Start local server**:
   ```bash
   npm start
   # or
   python -m http.server 8000
   ```

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

## 📦 Deployment

This is a static website with no backend requirements. It can be deployed to:

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to gh-pages branch
- **Any static hosting**: Upload all files to web server
- **CDN**: Serve files through CloudFlare, AWS S3, etc.

## ✨ How It Works

1. **3D Scene Setup**: Three.js initializes the 3D scene with proper lighting and camera
2. **Model Loading**: The bee model (glTF format) is loaded with animation support
3. **Scroll Tracking**: JavaScript monitors scroll position and triggers animations
4. **Dynamic Positioning**: GSAP animates the bee's position and rotation based on scroll
5. **Responsive Rendering**: Automatically adjusts to window resizing

## 🎯 Key Features Explained

### Scroll-Driven Animation
The bee model follows the user's scroll position, appearing in different locations and orientations for each section of the page.

### Responsive Design
The layout adapts to different screen sizes:
- Desktop: Full-featured experience
- Tablet: Adjusted typography and spacing
- Mobile: Optimized for smaller screens, absolute positioning for 3D container

### Performance Optimization
- CDN-hosted Three.js and GSAP reduce initial load time
- Efficient animation frame updates
- Proper garbage collection with event listeners

## 🔧 Configuration

No configuration files needed! The site works out of the box. However, you can customize:

- **Colors**: Edit `assets/styles/style.css`
- **Animation Timing**: Modify duration in GSAP calls in `js/app.js`
- **Bee Positions**: Update `arrPositionModel` array in `js/app.js`
- **Fonts**: Change font imports in `assets/styles/style.css`

## 🌐 Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- All modern browsers with WebGL support

## 📝 License

MIT License - Feel free to use this project for personal and commercial purposes.

## 👤 Author

Created by **oniko**

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

**Ready for production deployment!** 🚀
