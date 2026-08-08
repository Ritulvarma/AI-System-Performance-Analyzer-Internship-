import { SystemMetrics, ScoreBreakdown } from '@/types/metrics';

export function calculateScoreBreakdown(metrics: SystemMetrics): ScoreBreakdown {
  // 1. Performance Score (weighted by FPS, LCP, Long tasks)
  const fpsFactor = Math.min(100, (metrics.fps / 60) * 100);
  const lcpFactor = metrics.lcp < 1200 ? 100 : metrics.lcp < 2500 ? 80 : metrics.lcp < 4000 ? 55 : 30;
  const longTaskPenalty = Math.min(40, metrics.longTasksCount * 5);
  const performanceScore = Math.max(0, Math.min(100, Math.round(fpsFactor * 0.5 + lcpFactor * 0.5 - longTaskPenalty)));

  // 2. Memory Score (weighted by Heap Usage Ratio & Leak Risk)
  const heapRatio = metrics.memoryUsagePercentage;
  const memoryScore = Math.max(0, Math.min(100, Math.round(100 - heapRatio * 0.7 - metrics.leakProbability * 0.3)));

  // 3. CPU Score (weighted by CPU load & frame jitter)
  const cpuLoadFactor = 100 - metrics.estimatedCpuLoad;
  const jitterPenalty = Math.min(30, metrics.frameTimeJitter * 4);
  const cpuScore = Math.max(0, Math.min(100, Math.round(cpuLoadFactor * 0.8 - jitterPenalty + 10)));

  // 4. Responsiveness Score (CLS, INP, FID)
  const clsFactor = metrics.cls < 0.05 ? 100 : metrics.cls < 0.1 ? 80 : 40;
  const inpFactor = metrics.inp < 50 ? 100 : metrics.inp < 200 ? 75 : 40;
  const fidFactor = metrics.fid < 20 ? 100 : metrics.fid < 100 ? 80 : 50;
  const responsivenessScore = Math.round(clsFactor * 0.4 + inpFactor * 0.4 + fidFactor * 0.2);

  // 5. Network Score (RTT & Downlink)
  const rttFactor = metrics.rtt < 50 ? 100 : metrics.rtt < 150 ? 80 : metrics.rtt < 300 ? 60 : 35;
  const slowResourcePenalty = metrics.slowResourceCount * 8;
  const networkScore = Math.max(0, Math.min(100, Math.round(rttFactor - slowResourcePenalty)));

  // 6. Rendering Score (DOM node count, Paint time)
  const domNodePenalty = metrics.domNodeCount > 1500 ? 40 : metrics.domNodeCount > 800 ? 20 : 0;
  const fcpFactor = metrics.fcp < 800 ? 100 : metrics.fcp < 1800 ? 80 : 50;
  const renderingScore = Math.max(0, Math.min(100, Math.round(fcpFactor - domNodePenalty)));

  // 7. Resource Score (Script & Image payload efficiency)
  const scriptPenalty = metrics.scriptCount > 25 ? 30 : metrics.scriptCount > 15 ? 15 : 0;
  const totalMB = metrics.totalTransferredBytes / (1024 * 1024);
  const payloadPenalty = totalMB > 5 ? 35 : totalMB > 2 ? 15 : 0;
  const resourceScore = Math.max(0, Math.min(100, Math.round(100 - scriptPenalty - payloadPenalty)));

  // 8. Efficiency Score (Hardware Concurrency, Battery & Thread usage)
  const efficiencyScore = Math.max(0, Math.min(100, Math.round(
    (cpuScore * 0.4) + (memoryScore * 0.3) + (metrics.batteryCharging ? 95 : (metrics.batteryLevel || 1) * 90) * 0.3
  )));

  // 9. Optimization Score (Composite metric of system tuning headroom)
  const optimizationScore = Math.round(
    (performanceScore * 0.25) +
    (responsivenessScore * 0.25) +
    (renderingScore * 0.25) +
    (resourceScore * 0.25)
  );

  // 10. Overall AI Health Score
  const overallHealthScore = Math.round(
    performanceScore * 0.25 +
    memoryScore * 0.15 +
    cpuScore * 0.15 +
    responsivenessScore * 0.15 +
    renderingScore * 0.10 +
    networkScore * 0.10 +
    resourceScore * 0.10
  );

  return {
    overallHealthScore,
    performanceScore,
    memoryScore,
    cpuScore,
    responsivenessScore,
    networkScore,
    renderingScore,
    resourceScore,
    efficiencyScore,
    optimizationScore,
  };
}
