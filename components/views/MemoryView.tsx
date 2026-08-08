'use client';

import { SystemMetrics, ScoreBreakdown } from '@/types/metrics';
import MemoryChart from '../charts/MemoryChart';
import MetricCard from '../dashboard/MetricCard';
import { formatBytes } from '@/lib/utils';
import { HardDrive, AlertTriangle, ShieldCheck, TrendingUp, Cpu, Database } from 'lucide-react';

interface MemoryViewProps {
  metrics: SystemMetrics | null;
  scores: ScoreBreakdown | null;
  history: SystemMetrics[];
}

export default function MemoryView({ metrics, scores, history }: MemoryViewProps) {
  if (!metrics || !scores) return null;

  const usedMB = (metrics.usedJSHeapSize / (1024 * 1024)).toFixed(1);
  const totalMB = (metrics.totalJSHeapSize / (1024 * 1024)).toFixed(1);
  const limitMB = (metrics.jsHeapSizeLimit / (1024 * 1024)).toFixed(0);
  const peakMB = (metrics.peakMemory / (1024 * 1024)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 via-cyan-900/20 to-blue-900/20 border border-purple-500/30 backdrop-blur-cyber shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-tight">
                JavaScript Memory Heap &amp; Memory Leak Analyzer
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Tracks heap allocation, peak memory pressure, garbage collection cycles, and leak probability.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-cyber-card/80 border border-purple-500/30 font-mono text-center">
            <span className="text-[10px] text-slate-400 uppercase block">MEMORY SCORE</span>
            <span className="text-xl font-bold text-purple-400">{scores.memoryScore}/100</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Used JS Heap Size"
          value={Number(usedMB)}
          unit="MB"
          subtitle={`Capacity Used: ${metrics.memoryUsagePercentage}%`}
          accentColor="purple"
          sparklineData={history.slice(-15).map((m) => m.usedJSHeapSize / (1024 * 1024))}
          icon={<HardDrive className="w-4 h-4" />}
        />
        <MetricCard
          title="Peak Heap Allocation"
          value={Number(peakMB)}
          unit="MB"
          subtitle={`Allocated Total: ${totalMB} MB`}
          accentColor="cyan"
          sparklineData={history.slice(-15).map((m) => m.peakMemory / (1024 * 1024))}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          title="Heap Memory Limit"
          value={Number(limitMB)}
          unit="MB"
          subtitle="Max Browser Sandbox Capacity"
          accentColor="blue"
          icon={<Database className="w-4 h-4" />}
        />
        <MetricCard
          title="Leak Risk Probability"
          value={metrics.leakProbability}
          unit="%"
          subtitle={`Trend: ${metrics.memoryTrend.toUpperCase()}`}
          accentColor={metrics.leakProbability > 50 ? 'rose' : 'emerald'}
          sparklineData={history.slice(-15).map((m) => m.leakProbability)}
          icon={<AlertTriangle className="w-4 h-4" />}
        />
      </div>

      {/* Memory Allocation Chart */}
      <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Used JS Heap vs Allocated Limit Timeline (Last 30 Seconds)
            </h3>
          </div>
        </div>
        <div className="h-[300px]">
          <MemoryChart history={history} />
        </div>
      </div>
    </div>
  );
}
