import { SystemMetrics, ResourceMetric } from '@/types/metrics';
import { Recommendation } from '@/types/ai';

export function generateRecommendations(metrics: SystemMetrics, resources: ResourceMetric[]): Recommendation[] {
  const recs: Recommendation[] = [];
  const now = Date.now();

  // 1. Low FPS
  if (metrics.fps < 45) {
    recs.push({
      id: 'rec-low-fps',
      title: 'Low Frame Rate (FPS Drop Detected)',
      category: 'fps',
      priority: metrics.fps < 30 ? 'critical' : 'high',
      severity: Math.round(100 - (metrics.fps / 60) * 100),
      reason: `Current rendering frame rate is ${metrics.fps} FPS, causing visible jank and stuttering on animation sequences.`,
      technicalDetails: `Frame time jitter is currently ${metrics.frameTimeJitter}ms with ${metrics.frameDrops} frame drops registered in the last sample window.`,
      suggestedAction: 'Offload heavy computations from the main thread using Web Workers or wrap expensive render routines with React startTransition / requestIdleCallback.',
      codeSnippet: `// Offload heavy task to Web Worker\nconst worker = new Worker(new URL('./worker.ts', import.meta.url));\nworker.postMessage({ data: heavyData });`,
      expectedImprovement: 'Smooth 60 FPS animation delivery and 40% reduction in frame latency.',
      estimatedPerformanceGain: 28,
      confidenceScore: 96,
      timestamp: now,
    });
  }

  // 2. High Memory Consumption & Leak Risk
  if (metrics.memoryUsagePercentage > 65 || metrics.leakProbability > 50) {
    recs.push({
      id: 'rec-high-memory',
      title: 'Elevated Memory Heap Usage & Leak Risk',
      category: 'memory',
      priority: metrics.memoryUsagePercentage > 80 ? 'critical' : 'high',
      severity: metrics.memoryUsagePercentage,
      reason: `JS Heap memory is at ${metrics.memoryUsagePercentage}% capacity (${(metrics.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB used). Memory trend is ${metrics.memoryTrend}.`,
      technicalDetails: `Peak memory reached ${(metrics.peakMemory / (1024 * 1024)).toFixed(1)} MB with estimated leak probability of ${metrics.leakProbability}%.`,
      suggestedAction: 'Audit un-cleaned useEffect subscriptions, detached DOM nodes, global window object references, and large unpurged cache objects.',
      codeSnippet: `useEffect(() => {\n  const handler = () => {};\n  window.addEventListener('resize', handler);\n  return () => window.removeEventListener('resize', handler); // Crucial cleanup\n}, []);`,
      expectedImprovement: 'Free up to 120MB of JS heap and lower crash risk on low-tier mobile devices.',
      estimatedPerformanceGain: 35,
      confidenceScore: 92,
      timestamp: now,
    });
  }

  // 3. Too Many DOM Elements
  if (metrics.domNodeCount > 800) {
    recs.push({
      id: 'rec-dom-bloat',
      title: 'Excessive DOM Node Tree Complexity',
      category: 'dom',
      priority: metrics.domNodeCount > 1500 ? 'critical' : 'medium',
      severity: Math.min(100, Math.round((metrics.domNodeCount / 1500) * 100)),
      reason: `Document contains ${metrics.domNodeCount} active DOM elements (recommended maximum is <800 nodes).`,
      technicalDetails: 'Deep DOM trees increase style re-calculation, layout computation time, and memory footprint during dynamic re-renders.',
      suggestedAction: 'Implement DOM Virtualization (e.g. `@tanstack/react-virtual`) for long lists and dynamic tables.',
      codeSnippet: `// Virtualize large lists\nimport { useVirtualizer } from '@tanstack/react-virtual';\n// Renders only visible viewport DOM nodes`,
      expectedImprovement: '80% reduction in initial DOM nodes and 3x faster layout recalculations.',
      estimatedPerformanceGain: 22,
      confidenceScore: 94,
      timestamp: now,
    });
  }

  // 4. Large JavaScript Bundle & Resource Blocking
  const scripts = resources.filter(r => r.type === 'script');
  const largeScripts = scripts.filter(s => s.transferSize > 300000 || s.duration > 400);
  if (metrics.scriptCount > 15 || largeScripts.length > 0) {
    recs.push({
      id: 'rec-large-js',
      title: 'Large JavaScript Bundle & Script Execution Delay',
      category: 'javascript',
      priority: 'high',
      severity: 75,
      reason: `Detected ${metrics.scriptCount} script tags with ${largeScripts.length} monolithic bundles taking >300KB transfer size.`,
      technicalDetails: `Total JS execution time estimated at ${metrics.jsExecutionTime}ms during initialization.`,
      suggestedAction: 'Apply dynamic imports (Code Splitting via `next/dynamic` or `React.lazy`) and add `defer` / `async` to non-critical external scripts.',
      codeSnippet: `const HeavyComponent = dynamic(() => import('./HeavyComponent'), {\n  loading: () => <Skeleton />,\n  ssr: false,\n});`,
      expectedImprovement: '350ms faster First Contentful Paint (FCP) and reduced initial parse time.',
      estimatedPerformanceGain: 25,
      confidenceScore: 90,
      timestamp: now,
    });
  }

  // 5. Layout Shifts (CLS)
  if (metrics.cls > 0.05) {
    recs.push({
      id: 'rec-cls-shift',
      title: 'Cumulative Layout Shift (CLS) Detected',
      category: 'rendering',
      priority: metrics.cls > 0.15 ? 'critical' : 'medium',
      severity: Math.round(metrics.cls * 500),
      reason: `Current Cumulative Layout Shift score is ${metrics.cls} (Google Web Vitals threshold is < 0.1).`,
      technicalDetails: 'Elements without explicit width/height dimensions or dynamically injected banners cause layout recalculation jumps.',
      suggestedAction: 'Reserve layout aspect ratio boxes using CSS `aspect-ratio` or `min-height` skeletons before asynchronous image/ad content arrives.',
      codeSnippet: `<div className="aspect-video w-full bg-slate-800 animate-pulse">\n  <Image src="..." width={800} height={450} alt="..." />\n</div>`,
      expectedImprovement: 'Zero visual displacement and perfect Google Web Vitals CLS score.',
      estimatedPerformanceGain: 18,
      confidenceScore: 98,
      timestamp: now,
    });
  }

  // 6. Long Tasks & Main Thread Blocking
  if (metrics.longTasksCount > 0) {
    recs.push({
      id: 'rec-long-tasks',
      title: 'Main Thread Blocked by Long Tasks',
      category: 'javascript',
      priority: 'high',
      severity: Math.min(100, metrics.longTasksCount * 20),
      reason: `Logged ${metrics.longTasksCount} Long Tasks blocking main UI thread for a total of ${metrics.totalLongTaskDuration}ms.`,
      technicalDetails: 'Long tasks (>50ms single continuous synchronous JS block) cause input lag, delayed click response, and animation drops.',
      suggestedAction: 'Break long synchronous loops into microtasks using `setTimeout(fn, 0)` or `scheduler.yield()` where available.',
      codeSnippet: `async function processInBatches(items) {\n  for (let item of items) {\n    process(item);\n    await new Promise(r => setTimeout(r, 0)); // Yield thread back to browser UI\n  }\n}`,
      expectedImprovement: 'Immediate response to user clicks with Total Blocking Time (TBT) cut by 60%.',
      estimatedPerformanceGain: 30,
      confidenceScore: 95,
      timestamp: now,
    });
  }

  // 7. Render Blocking CSS & Unused CSS
  const cssResources = resources.filter(r => r.type === 'stylesheet');
  if (cssResources.length > 3 || metrics.cssCount > 5) {
    recs.push({
      id: 'rec-render-blocking-css',
      title: 'Render Blocking Stylesheet Detected',
      category: 'css',
      priority: 'medium',
      severity: 55,
      reason: `Detected ${metrics.cssCount} stylesheet dependencies holding up first paint rendering pass.`,
      technicalDetails: 'Synchronous CSS files prevent browser layout engine from painting pixels until completely fetched and parsed.',
      suggestedAction: 'Inline critical CSS into document header and load non-critical stylesheets asynchronously with `rel="preload"`.',
      codeSnippet: `<link rel="preload" href="/non-critical.css" as="style" onload="this.rel='stylesheet'" />`,
      expectedImprovement: '200ms quicker First Paint (FP) duration.',
      estimatedPerformanceGain: 15,
      confidenceScore: 88,
      timestamp: now,
    });
  }

  // 8. Large Unoptimized Image Resources
  const images = resources.filter(r => r.type === 'image');
  const largeImages = images.filter(img => img.transferSize > 400000);
  if (largeImages.length > 0) {
    recs.push({
      id: 'rec-large-images',
      title: 'Uncompressed / Heavy Image Resources',
      category: 'images',
      priority: 'medium',
      severity: 65,
      reason: `${largeImages.length} image asset(s) exceeding 400KB payload were delivered to client.`,
      technicalDetails: `Top uncompressed image asset: "${largeImages[0].name}" (${(largeImages[0].transferSize / 1024).toFixed(0)} KB).`,
      suggestedAction: 'Convert PNG/JPEG assets to WebP or AVIF format with responsive `srcset` and `loading="lazy"`.',
      codeSnippet: `<Image src="/hero.webp" width={1200} height={600} quality={80} format="avif" loading="lazy" />`,
      expectedImprovement: '65% bandwidth payload reduction on mobile networks.',
      estimatedPerformanceGain: 20,
      confidenceScore: 96,
      timestamp: now,
    });
  }

  // 9. Slow Network Latency / RTT Delay
  if (metrics.rtt > 120 || metrics.slowResourceCount > 2) {
    recs.push({
      id: 'rec-network-latency',
      title: 'High Network Round-Trip Time (RTT) & Slow Endpoints',
      category: 'network',
      priority: metrics.rtt > 250 ? 'high' : 'medium',
      severity: Math.min(100, Math.round((metrics.rtt / 300) * 100)),
      reason: `Network RTT is ${metrics.rtt}ms with ${metrics.slowResourceCount} resources taking over 500ms to complete response download.`,
      technicalDetails: `Connection type: ${metrics.effectiveType.toUpperCase()} with estimated downlink speed of ${metrics.downlink} Mbps.`,
      suggestedAction: 'Enable HTTP/3 (QUIC), implement Edge CDN Caching (Vercel Edge Network), and DNS prefetch API domain endpoints.',
      codeSnippet: `<link rel="dns-prefetch" href="https://api.yourdomain.com" />\n<link rel="preconnect" href="https://api.yourdomain.com" crossorigin />`,
      expectedImprovement: '150ms faster TTFB and seamless resource fetching.',
      estimatedPerformanceGain: 24,
      confidenceScore: 91,
      timestamp: now,
    });
  }

  // 10. Large Font Files & FOIT / FOUT
  const fonts = resources.filter(r => r.type === 'font');
  if (metrics.fontCount > 2 || fonts.some(f => f.transferSize > 150000)) {
    recs.push({
      id: 'rec-large-fonts',
      title: 'Font Preloading & Flash of Unstyled Text (FOUT)',
      category: 'fonts',
      priority: 'low',
      severity: 40,
      reason: `Font file download payload detected (${metrics.fontCount} fonts loaded).`,
      technicalDetails: 'Custom web fonts without font-display swap can lock text rendering for up to 3 seconds during network latency.',
      suggestedAction: 'Use `font-display: swap;` in CSS `@font-face` declarations or Next.js `next/font` zero-CLS optimization.',
      codeSnippet: `import { Inter } from 'next/font/google';\nconst inter = Inter({ subsets: ['latin'], display: 'swap' });`,
      expectedImprovement: 'Instant text display during page load with zero FOIT delay.',
      estimatedPerformanceGain: 12,
      confidenceScore: 94,
      timestamp: now,
    });
  }

  // Always return top recommendations sorted by severity
  return recs.sort((a, b) => b.severity - a.severity);
}
