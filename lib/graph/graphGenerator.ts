import { DependencyGraphData, GraphNodeData, GraphEdgeData } from '@/types/graph';
import { SystemMetrics } from '@/types/metrics';

export function generateDependencyGraph(metrics: SystemMetrics): DependencyGraphData {
  const nodes: { data: GraphNodeData }[] = [
    {
      data: {
        id: 'app-core',
        label: 'AI Perf Engine (App Core)',
        type: 'application',
        health: 'optimal',
        sizeBytes: 145000,
        latencyMs: 1.2,
        details: 'Next.js 15 App Router Core Engine',
        dependenciesCount: 8,
      },
    },
    {
      data: {
        id: 'page-dashboard',
        label: 'Main Dashboard Page',
        type: 'page',
        health: metrics.fps < 45 ? 'warning' : 'optimal',
        sizeBytes: 42000,
        latencyMs: 4.5,
        details: 'Executive KPI Grid & Real-time Gauges',
        dependenciesCount: 5,
      },
    },
    {
      data: {
        id: 'page-performance',
        label: 'Performance & FPS View',
        type: 'page',
        health: metrics.longTasksCount > 2 ? 'warning' : 'optimal',
        sizeBytes: 38000,
        latencyMs: 8.1,
        details: 'Frame time & Long task analysis',
        dependenciesCount: 4,
      },
    },
    {
      data: {
        id: 'page-memory',
        label: 'Memory & Leak Analyzer',
        type: 'page',
        health: metrics.memoryUsagePercentage > 75 ? 'critical' : 'optimal',
        sizeBytes: 35000,
        latencyMs: 3.8,
        details: 'Heap size & GC inspection',
        dependenciesCount: 3,
      },
    },
    {
      data: {
        id: 'cmp-metrics-engine',
        label: 'MetricsCollector Hook',
        type: 'component',
        health: 'optimal',
        sizeBytes: 18000,
        latencyMs: 2.1,
        details: 'Browser API Observer polling',
        dependenciesCount: 6,
      },
    },
    {
      data: {
        id: 'cmp-ai-recs',
        label: 'AI Recommendation Engine',
        type: 'component',
        health: 'optimal',
        sizeBytes: 24000,
        latencyMs: 5.2,
        details: 'Weighted algorithm scoring engine',
        dependenciesCount: 4,
      },
    },
    {
      data: {
        id: 'cmp-cyber-chart',
        label: 'Chart.js Cyber Visualizer',
        type: 'component',
        health: metrics.fps < 30 ? 'critical' : 'optimal',
        sizeBytes: 95000,
        latencyMs: 12.4,
        details: 'Canvas 2D render context controller',
        dependenciesCount: 2,
      },
    },
    {
      data: {
        id: 'script-next-framework',
        label: 'next-framework.js',
        type: 'script',
        health: 'optimal',
        sizeBytes: 320000,
        latencyMs: 45.0,
        details: 'React 19 & Next.js client bundle',
        dependenciesCount: 0,
      },
    },
    {
      data: {
        id: 'script-chartjs',
        label: 'chart.js / react-chartjs-2',
        type: 'script',
        health: 'optimal',
        sizeBytes: 180000,
        latencyMs: 28.5,
        details: 'Charting library module bundle',
        dependenciesCount: 0,
      },
    },
    {
      data: {
        id: 'script-cytoscape',
        label: 'cytoscape.js',
        type: 'script',
        health: 'optimal',
        sizeBytes: 210000,
        latencyMs: 32.0,
        details: 'Graph visualization library engine',
        dependenciesCount: 0,
      },
    },
    {
      data: {
        id: 'style-globals',
        label: 'globals.css (Tailwind)',
        type: 'style',
        health: 'optimal',
        sizeBytes: 45000,
        latencyMs: 14.2,
        details: 'Glassmorphism dark theme tokens',
        dependenciesCount: 0,
      },
    },
    {
      data: {
        id: 'font-inter',
        label: 'inter-latin.woff2',
        type: 'font',
        health: 'optimal',
        sizeBytes: 28000,
        latencyMs: 18.0,
        details: 'Primary UI typography asset',
        dependenciesCount: 0,
      },
    },
    {
      data: {
        id: 'api-metrics',
        label: 'Internal Perf API',
        type: 'api',
        health: metrics.rtt > 200 ? 'warning' : 'optimal',
        sizeBytes: 4200,
        latencyMs: metrics.rtt,
        details: 'Virtual telemetry REST endpoint',
        dependenciesCount: 0,
      },
    },
    {
      data: {
        id: '3rd-vitals',
        label: 'Web Vitals Observer',
        type: 'third-party',
        health: 'optimal',
        sizeBytes: 12000,
        latencyMs: 8.5,
        details: 'Real User Monitoring telemetry beacon',
        dependenciesCount: 0,
      },
    },
  ];

  const edges: { data: GraphEdgeData }[] = [
    { data: { id: 'e1', source: 'app-core', target: 'page-dashboard', label: 'renders' } },
    { data: { id: 'e2', source: 'app-core', target: 'page-performance', label: 'renders' } },
    { data: { id: 'e3', source: 'app-core', target: 'page-memory', label: 'renders' } },
    { data: { id: 'e4', source: 'page-dashboard', target: 'cmp-metrics-engine', label: 'subscribes' } },
    { data: { id: 'e5', source: 'page-dashboard', target: 'cmp-ai-recs', label: 'evaluates' } },
    { data: { id: 'e6', source: 'page-dashboard', target: 'cmp-cyber-chart', label: 'embeds' } },
    { data: { id: 'e7', source: 'page-performance', target: 'cmp-cyber-chart', label: 'embeds' } },
    { data: { id: 'e8', source: 'cmp-metrics-engine', target: 'api-metrics', label: 'polls' } },
    { data: { id: 'e9', source: 'app-core', target: 'script-next-framework', label: 'imports' } },
    { data: { id: 'e10', source: 'cmp-cyber-chart', target: 'script-chartjs', label: 'depends' } },
    { data: { id: 'e11', source: 'app-core', target: 'script-cytoscape', label: 'depends' } },
    { data: { id: 'e12', source: 'app-core', target: 'style-globals', label: 'includes' } },
    { data: { id: 'e13', source: 'style-globals', target: 'font-inter', label: 'loads' } },
    { data: { id: 'e14', source: 'cmp-metrics-engine', target: '3rd-vitals', label: 'beacon' } },
  ];

  return { nodes, edges };
}
