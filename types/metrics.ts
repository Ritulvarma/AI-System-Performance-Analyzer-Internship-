export interface SystemMetrics {
  timestamp: number;
  
  // CPU & Responsiveness
  estimatedCpuLoad: number; // 0-100%
  fps: number;
  averageFps: number;
  minFps: number;
  maxFps: number;
  frameTime: number; // ms
  frameTimeJitter: number; // ms
  frameDrops: number;
  longTasksCount: number;
  totalLongTaskDuration: number;
  jsExecutionTime: number; // ms
  
  // Memory
  memorySupported: boolean;
  jsHeapSizeLimit: number; // bytes
  totalJSHeapSize: number; // bytes
  usedJSHeapSize: number; // bytes
  memoryUsagePercentage: number;
  peakMemory: number;
  avgMemory: number;
  memoryTrend: 'stable' | 'increasing' | 'decreasing';
  leakProbability: number; // 0-100%
  
  // Core Web Vitals & Timings
  fcp: number; // First Contentful Paint (ms)
  lcp: number; // Largest Contentful Paint (ms)
  cls: number; // Cumulative Layout Shift score
  inp: number; // Interaction to Next Paint (ms)
  fid: number; // First Input Delay (ms)
  ttfb: number; // Time to First Byte (ms)
  domContentLoaded: number; // ms
  loadTime: number; // ms
  
  // DOM & Resources
  domNodeCount: number;
  scriptCount: number;
  cssCount: number;
  imageCount: number;
  fontCount: number;
  resourceCount: number;
  totalTransferredBytes: number;
  
  // Network
  online: boolean;
  connectionType: string;
  effectiveType: string;
  rtt: number; // ms
  downlink: number; // Mbps
  downloadSpeedEstimate: string;
  uploadSpeedEstimate: string;
  failedResourceCount: number;
  slowResourceCount: number;
  
  // Device & Hardware System
  hardwareConcurrency: number;
  deviceMemory: number; // GB (where available)
  devicePixelRatio: number;
  screenWidth: number;
  screenHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  batteryLevel?: number; // 0-1
  batteryCharging?: boolean;
  gpuRenderer?: string;
  
  // Environment Info
  browserName: string;
  browserVersion: string;
  osName: string;
  platform: string;
  userAgent: string;
  timezone: string;
  language: string;
}

export interface ResourceMetric {
  id: string;
  name: string;
  url: string;
  type: 'script' | 'stylesheet' | 'image' | 'font' | 'fetch' | 'xmlhttprequest' | 'other';
  duration: number; // ms
  transferSize: number; // bytes
  decodedBodySize: number; // bytes
  initiatorType: string;
  renderBlocking: boolean;
  startTime: number;
  protocol: string;
}

export interface ScoreBreakdown {
  overallHealthScore: number;
  performanceScore: number;
  memoryScore: number;
  cpuScore: number;
  responsivenessScore: number;
  networkScore: number;
  renderingScore: number;
  resourceScore: number;
  efficiencyScore: number;
  optimizationScore: number;
}
