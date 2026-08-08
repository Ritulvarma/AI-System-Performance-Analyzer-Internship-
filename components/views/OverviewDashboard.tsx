'use client';

import { SystemMetrics, ScoreBreakdown, ResourceMetric } from '@/types/metrics';
import { Recommendation, ActivityItem } from '@/types/ai';
import HealthGaugeCard from '../dashboard/HealthGaugeCard';
import MetricCard from '../dashboard/MetricCard';
import CpuChart from '../charts/CpuChart';
import MemoryChart from '../charts/MemoryChart';
import CoreWebVitalsChart from '../charts/CoreWebVitalsChart';
import LiveActivityFeed from '../feed/LiveActivityFeed';
import { formatBytes, formatDuration } from '@/lib/utils';
import {
  Gauge,
  Cpu,
  HardDrive,
  Activity,
  Zap,
  Layers,
  Network,
  Lightbulb,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface OverviewDashboardProps {
  metrics: SystemMetrics | null;
  scores: ScoreBreakdown | null;
  history: SystemMetrics[];
  recommendations: Recommendation[];
  activityFeed: ActivityItem[];
  resources: ResourceMetric[];
  onSelectTab: (tab: any) => void;
}

export default function OverviewDashboard({
  metrics,
  scores,
  history,
  recommendations,
  activityFeed,
  resources,
  onSelectTab,
}: OverviewDashboardProps) {
  if (!metrics || !scores) return null;

  return (
    <div className="space-y-6">
      {/* Top AI Health Scores Row - 4 Primary Health Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthGaugeCard
          title="Overall AI Health"
          score={scores.overallHealthScore}
          subtitle="System Composite Rating"
          icon={<ShieldCheck className="w-4 h-4" />}
          trend="STABLE"
        />
        <HealthGaugeCard
          title="Performance Score"
          score={scores.performanceScore}
          subtitle={`FPS ${metrics.fps} / LCP ${metrics.lcp}ms`}
          icon={<Gauge className="w-4 h-4" />}
          trend={`${metrics.fps} FPS`}
        />
        <HealthGaugeCard
          title="Memory Efficiency"
          score={scores.memoryScore}
          subtitle={`${metrics.memoryUsagePercentage}% Heap Capacity`}
          icon={<HardDrive className="w-4 h-4" />}
          trend={metrics.memoryTrend.toUpperCase()}
        />
        <HealthGaugeCard
          title="CPU Responsiveness"
          score={scores.cpuScore}
          subtitle={`Main Thread Load ${metrics.estimatedCpuLoad}%`}
          icon={<Cpu className="w-4 h-4" />}
          trend={`${metrics.estimatedCpuLoad}% LOAD`}
        />
      </div>

      {/* Secondary KPI Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          title="Frame Rate"
          value={metrics.fps}
          unit="FPS"
          subtitle={`Avg: ${metrics.averageFps} | Drops: ${metrics.frameDrops}`}
          accentColor="cyan"
          sparklineData={history.slice(-10).map((m) => m.fps)}
          icon={<Activity className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="JS Heap Memory"
          value={Number((metrics.usedJSHeapSize / (1024 * 1024)).toFixed(1))}
          unit="MB"
          subtitle={`Limit: ${(metrics.jsHeapSizeLimit / (1024 * 1024)).toFixed(0)} MB`}
          accentColor="purple"
          sparklineData={history.slice(-10).map((m) => m.usedJSHeapSize / (1024 * 1024))}
          icon={<HardDrive className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="DOM Element Count"
          value={metrics.domNodeCount}
          unit="Nodes"
          subtitle={`Scripts: ${metrics.scriptCount} | CSS: ${metrics.cssCount}`}
          accentColor="blue"
          sparklineData={history.slice(-10).map((m) => m.domNodeCount)}
          icon={<Layers className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="First Contentful Paint"
          value={metrics.fcp}
          unit="ms"
          subtitle={`LCP: ${metrics.lcp}ms`}
          accentColor="emerald"
          sparklineData={history.slice(-10).map((m) => m.fcp)}
          icon={<Zap className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="Network Latency"
          value={metrics.rtt}
          unit="ms"
          subtitle={`${metrics.effectiveType.toUpperCase()} | ${metrics.downloadSpeedEstimate}`}
          accentColor="amber"
          sparklineData={history.slice(-10).map((m) => m.rtt)}
          icon={<Network className="w-3.5 h-3.5" />}
        />
        <MetricCard
          title="Long Tasks Count"
          value={metrics.longTasksCount}
          unit="Tasks"
          subtitle={`Total: ${metrics.totalLongTaskDuration}ms`}
          accentColor="rose"
          sparklineData={history.slice(-10).map((m) => m.longTasksCount)}
          icon={<Cpu className="w-3.5 h-3.5" />}
        />
      </div>

      {/* Main Charts & Activity Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CPU & Memory Live Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Live CPU Thread Pressure &amp; Execution Load
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                {metrics.hardwareConcurrency} Cores Detected
              </span>
            </div>
            <CpuChart history={history} />
          </div>

          <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  JavaScript Heap Memory Allocation Trend
                </h3>
              </div>
              <span className="text-[11px] font-mono text-purple-300 font-semibold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                Leak Risk: {metrics.leakProbability}%
              </span>
            </div>
            <MemoryChart history={history} />
          </div>
        </div>

        {/* Right Side Column: Live Telemetry Feed & Web Vitals */}
        <div className="space-y-6">
          <LiveActivityFeed activities={activityFeed} />

          {/* Core Web Vitals Summary */}
          <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Core Web Vitals Metrics
                </h3>
              </div>
            </div>
            <CoreWebVitalsChart metrics={metrics} />
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Recommended AI Optimizations */}
      <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Top AI Intelligent Optimization Recommendations
            </h3>
          </div>
          <button
            onClick={() => onSelectTab('recommendations')}
            className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
          >
            <span>View All ({recommendations.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.slice(0, 4).map((rec) => (
            <motion.div
              key={rec.id}
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-cyber-bg/60 border border-cyber-border hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
                    {rec.title}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    rec.priority === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                    rec.priority === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{rec.reason}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[11px] font-mono">
                <span className="text-emerald-400 font-semibold">{rec.expectedImprovement}</span>
                <span className="text-slate-400">+{rec.estimatedPerformanceGain}% Speed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
