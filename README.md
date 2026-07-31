# 🌌 Nebula Canvas - Interactive Particle Studio

Nebula Canvas is a high-performance, aesthetically stunning, and highly-customizable interactive particle simulation platform built with the HTML5 Canvas API and modern vanilla JavaScript.

It features a premium **glassmorphic control dashboard** that allows users to manipulate particle properties, adjust physics forces, select dynamic color palettes, configure preset profiles, trigger unique animations in the **Celebrations Engine**, and celebrate names in stardust.

---

## 🚀 Key Features

- 🎛️ **Glassmorphic Customization Dashboard** – Collapsible sidebar built with modern CSS variables, blur filters (`backdrop-filter`), and glowing interactive elements.
- ✨ **Interactive Visual Presets** – Switch between pre-configured states instantly:
  - *Galaxy*: Shifting rainbow orbits with smooth trails.
  - *Neural Web*: Delicate connection grids mimicking cybernetic neural networks.
  - *Vortex*: Magnetic attraction forming cosmic orbits of spinning star particles.
- 🎨 **Dynamic Color Palettes** – Supports Rainbow (HSV spectrum), Aurora (Green/Teal), Cosmic (Violet/Pink), Volcanic (Gold/Red), Neon Monochromatic Cyan, Cyberpunk (Neon Pink & Cyan), Forest Moss (Greens), and Midnight Monochrome (Grayscale/Whites).
- 📐 **Custom Shapes** – Support for rendering circles, squares, stars, triangles, hearts, rings, and crosses.
- ⚙️ **Advanced Particle Physics** – Fine-tune size, speed, spawn rate, gravity vectors, friction, and velocity damping.
- 🖱️ **Magnetic Interaction Modes**:
  - *Flow*: Free particles spawned at mouse/touch coordinates.
  - *Magnet*: Particles gravitationally pull toward the cursor.
- ✍️ **Dynamic Name Trails** – Waving the cursor or dragging on mobile projects the letters of your name sequentially as a glowing trail (e.g. "A-L-I-C-E") following the pointer paths.
- 🎉 **Celebrations Engine**:
  - *Fireworks*: Multi-rocket launcher that shoots upwards and explodes into bright circular shells of light.
  - *Confetti Storm*: Spawns colorful squares, triangles, and crosses descending gracefully from the top of the canvas.
  - *Supernova*: A fast-expanding ring shockwave of hearts or rings blasting outward from the center of the screen.
- 🚀 **Celebrate Your Name** – Enter any name up to 12 characters. An offscreen pixel scanner parses the text contours and spawns glowing particles that form the letters in stardust in the center of the screen before floating away.
- 📱 **Mobile Touch Support** – Custom touch listeners for seamless particle emission and physics drag on smartphones and tablets.

---

## 🛠 Tech Stack

- **HTML5** – Structured elements and Canvas API.
- **CSS3** – Advanced modern styling, variables, glassmorphic layout, custom slider inputs, and animations.
- **JavaScript (ES6+)** – OOP-based particle engine, physics calculations, vector-like attraction/repulsion forces, and DOM integrations.
- **FontAwesome** – Vector iconography.
- **Google Fonts** – Space Grotesk premium typography.

---

## 📂 Project Structure

```
NEBULA_CANVAS/
│
├── index.html        # Main interface & glassmorphic control dashboard structure
├── style.css         # CSS stylesheet with layout, glassmorphic styles, & styling variables
├── script.js         # Modular particle engine, physics handlers, & UI listeners
│
└── README.md         # Comprehensive project documentation
```

---

## ▶️ Get Started Locally

Since the project uses lightweight serverless web technologies, no heavy compilers or installation dependencies are required:

1. Clone or download this repository.
2. Open `index.html` directly in any modern browser.

---

## 🧠 Core Engineering Principles

### 1. High Performance requestAnimationFrame Loop
Renders frames in sync with your monitor refresh rate. Uses automatic array splicing for efficient memory management to prevent memory leaks as particles expire.

### 2. Multi-Device Compatibility
Combines standard desktop mouse listeners with mobile touch gestures (`touchstart`, `touchmove`, `touchend`) to provide a consistent interactive feedback loop across form factors.

### 3. Connection Optimization
The constellation web utilizes high-performance proximity math mapping to render connections dynamically between active particles without causing browser lag.

---
## Live Link
https://interactive-particle-engine.vercel.app

---

## 👨‍💻 Author

**Your Name**  
GitHub: Ganga07-code

---

