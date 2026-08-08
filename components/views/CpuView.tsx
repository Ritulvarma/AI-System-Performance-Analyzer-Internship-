'use client';

import { SystemMetrics, ScoreBreakdown } from '@/types/metrics';
import CpuChart from '../charts/CpuChart';
import MetricCard from '../dashboard/MetricCard';
import { Cpu, Zap, Activity, Monitor, ShieldCheck } from 'lucide-react';

interface CpuViewProps {
  metrics: SystemMetrics | null;
  scores: ScoreBreakdown | null;
  history: SystemMetrics[];
}

export default function CpuView({ metrics, scores, history }: CpuViewProps) {
  if (!metrics || !scores) return null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-cyan-900/20 to-purple-900/20 border border-blue-500/30 backdrop-blur-cyber shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-tight">
                CPU Thread Saturation &amp; Hardware Acceleration
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Monitors main thread execution density, hardware concurrency, timing jitter, and WebGL GPU pipeline.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-cyber-card/80 border border-cyan-500/30 font-mono text-center">
            <span className="text-[10px] text-slate-400 uppercase block">CPU SCORE</span>
            <span className="text-xl font-bold text-cyan-400">{scores.cpuScore}/100</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Estimated CPU Load"
          value={metrics.estimatedCpuLoad}
          unit="%"
          subtitle="Main Thread Pressure"
          accentColor="cyan"
          sparklineData={history.slice(-15).map((m) => m.estimatedCpuLoad)}
          icon={<Cpu className="w-4 h-4" />}
        />
        <MetricCard
          title="CPU Hardware Cores"
          value={metrics.hardwareConcurrency}
          unit="Threads"
          subtitle="Logical Processors"
          accentColor="blue"
          icon={<Zap className="w-4 h-4" />}
        />
        <MetricCard
          title="Frame Jitter Delta"
          value={metrics.frameTimeJitter}
          unit="ms"
          subtitle="Execution Timing Variance"
          accentColor="purple"
          sparklineData={history.slice(-15).map((m) => m.frameTimeJitter)}
          icon={<Activity className="w-4 h-4" />}
        />
        <MetricCard
          title="Device Memory (RAM)"
          value={metrics.deviceMemory || 8}
          unit="GB"
          subtitle="System Hardware RAM"
          accentColor="emerald"
          icon={<Monitor className="w-4 h-4" />}
        />
      </div>

      {/* Hardware System Specs Card */}
      <div className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-border backdrop-blur-cyber font-mono text-xs text-slate-300 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 rounded-xl bg-cyber-bg/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">GPU Renderer Acceleration</span>
          <p className="font-bold text-cyan-300 truncate">{metrics.gpuRenderer || 'Standard WebGL Renderer'}</p>
        </div>
        <div className="p-3 rounded-xl bg-cyber-bg/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Operating System</span>
          <p className="font-bold text-purple-300">{metrics.osName} ({metrics.platform})</p>
        </div>
        <div className="p-3 rounded-xl bg-cyber-bg/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Viewport &amp; Resolution</span>
          <p className="font-bold text-emerald-300">{metrics.viewportWidth}x{metrics.viewportHeight} (DPR {metrics.devicePixelRatio})</p>
        </div>
      </div>

      {/* CPU Chart */}
      <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              CPU Main Thread Load Percentage Trend
            </h3>
          </div>
        </div>
        <div className="h-[300px]">
          <CpuChart history={history} />
        </div>
      </div>
    </div>
  );
}
