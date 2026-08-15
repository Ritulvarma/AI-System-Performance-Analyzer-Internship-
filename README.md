# 🚀 AI Performance Analyzer

> A modern, real-time web application performance monitoring dashboard and AI recommendation engine built with **Next.js 15**, **React 19**, **TypeScript**, **Chart.js**, **Cytoscape.js**, and **Tailwind CSS**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-brightgreen?style=for-the-badge&logo=vercel)](https://ai-system-performance-analyzer-internship-ugjx-gyctn8sfo.vercel.app/)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## 🌐 Live Demo

You can run and experience the live application online here:
👉 **[Launch AI Performance Analyzer](https://ai-system-performance-analyzer-internship-ugjx-gyctn8sfo.vercel.app
)**

---

## 📖 Overview

**AI Performance Analyzer** is an end-to-end performance diagnostic and monitoring workspace designed for modern web applications. It provides live metric telemetry, real-time browser Web Vitals extraction, synthetic CPU load and memory usage tracking, time-travel history scrubbing, an interactive architecture dependency graph, and automated AI performance optimization recommendations.

---

## ✨ Key Features

### ⚡ Real-Time Core Web Vitals Tracking
- **LCP (Largest Contentful Paint)**, **FID (First Input Delay)**, **CLS (Cumulative Layout Shift)**, **INP (Interaction to Next Paint)**, **FCP (First Contentful Paint)**, and **TTFB (Time to First Byte)** metrics captured directly via browser Performance Observers.
- **Overall Performance Scorecard**: Dynamic scoring engine calculating overall system health, memory efficiency, CPU load stability, and layout shift scores.

### 🧠 AI-Powered Recommendation Engine
- Rule-based AI diagnostic analyzer evaluating performance metrics in real-time.
- Categorized actionable insights (**Critical**, **Warning**, **Optimization**, **Info**).
- Automated remediation guidance for common performance bottlenecks like DOM bloat, render-blocking scripts, uncompressed assets, and event loop delays.

### 🕒 Time-Travel History Scrubber
- Full historical timeline recording metric snapshots over time.
- Interactive timeline scrubber allowing users to inspect past performance spikes, memory leaks, and CPU spikes.
- Play/Pause real-time telemetry streaming at customizable polling intervals.

### 🕸️ Interactive Cytoscape Architecture Graph
- Visual node-edge graph generated directly from performance metrics and network requests.
- Node types: **Browser Engine**, **DOM Engine**, **Core Web Vitals**, **JS Heap**, **Resource Threads**, and **Network Assets**.
- Interactive node dragging, zoom/pan controls, and visual state indicators based on metric health.

### 📊 Rich Analytical Dashboards
- Dedicated tabs for **Overview**, **Performance**, **Memory**, **CPU Load**, **Network & Resources**, **Dependency Graph**, **AI Recommendations**, and **System Settings**.
- Animated metric cards with dynamic counters and glassmorphic UI styling.
- Smooth Framer Motion transitions and responsive visual layouts.

### 📄 Export & Reporting Suite
- **PDF Report Generation**: Instant export of full dashboard diagnostic reports using `jsPDF` and `html2canvas`.
- **JSON Export**: Raw structured metric dumps for logging and diagnostic analysis.
- **CSV Export**: Performance history time-series data download.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI & Logic**: [React 19](https://react.dev/), [TypeScript 5.7](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Glassmorphic Design System, [Lucide React](https://lucide.dev/) Icons
- **Charting & Data Viz**: [Chart.js](https://www.chartjs.org/), [react-chartjs-2](https://react-chartjs-2.js.org/), [Cytoscape.js](https://js.cytoscape.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), HTML5 Canvas Ambient Particles
- **Document Export**: `jsPDF`, `html2canvas`

---

## 📂 Project Structure

```text
ai-performance-analyzer/
├── app/
│   ├── globals.css         # Custom utility classes & scrollbar styles
│   ├── layout.tsx          # Root application layout
│   └── page.tsx            # Main workspace coordinator page
├── components/
│   ├── charts/             # Chart.js integration containers (Line, Bar, Doughnut, Radar)
│   ├── dashboard/          # Dynamic counter cards & metric widgets
│   ├── feed/               # Real-time activity feed logger
│   ├── graph/              # Cytoscape.js dependency graph canvas
│   ├── layout/             # Navbar, Sidebar & Particle Background
│   ├── timeline/           # Performance timeline scrubber bar
│   └── views/              # View tabs (Overview, Memory, CPU, Resources, Graph, Recommendations, Settings)
├── hooks/
│   └── usePerformanceMonitor.ts  # State management & live metric sampling engine
├── lib/
│   ├── ai/                 # AI recommendation rules & scoring engine
│   ├── export/             # PDF, JSON, and CSV export utilities
│   ├── graph/              # Cytoscape graph data generator
│   ├── metrics/            # Performance Observer & browser metrics collector
│   └── utils.ts            # Formatting helpers & Tailwind merge utilities
├── types/
│   ├── metrics.ts          # Performance metrics TypeScript interfaces
│   └── graph.ts            # Cytoscape node/edge type definitions
├── tailwind.config.ts      # Tailwind design tokens & dark-mode configurations
└── package.json            # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v18.0.0` or higher
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ai-performance-analyzer.git
   cd ai-performance-analyzer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with Hot Module Replacement (HMR).
- `npm run build`: Builds the application for production deployment.
- `npm run start`: Starts the production server after building.
- `npm run lint`: Runs ESLint to check for syntax and style issues.

---

## ⚙️ Configuration

Within the **Settings** view in the application, you can configure:
- **Sampling Interval**: Adjust real-time polling frequency (e.g. 1s - 5s).
- **Alert Thresholds**: Customize memory limit and CPU load threshold triggers.
- **Particle Background**: Toggle canvas background particle animations for GPU saving.
- **Memory Leak Simulator**: Toggle synthetic memory leak injection for stress testing.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to report a bug or suggest a new feature:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p center>
  Made with ❤️ for High-Performance Web Applications.
</p>
