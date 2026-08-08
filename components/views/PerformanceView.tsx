'use client';

import { SystemMetrics, ScoreBreakdown } from '@/types/metrics';
import FpsChart from '../charts/FpsChart';
import MetricCard from '../dashboard/MetricCard';
import { Gauge, Activity, Clock, Zap, Cpu, AlertTriangle } from 'lucide-react';

interface PerformanceViewProps {
  metrics: SystemMetrics | null;
  scores: ScoreBreakdown | null;
  history: SystemMetrics[];
}

export default function PerformanceView({ metrics, scores, history }: PerformanceViewProps) {
  if (!metrics || !scores) return null;

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/30 via-purple-900/20 to-blue-900/20 border border-cyan-500/30 backdrop-blur-cyber shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-tight">
                Rendering Performance &amp; Frame Rate Analyzer
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Real-time frame delivery rate, render time jitter, and main thread long task detection.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-cyber-card/80 border border-cyan-500/30 font-mono text-center">
            <span className="text-[10px] text-slate-400 uppercase block">PERFORMANCE RATING</span>
            <span className="text-xl font-bold text-cyan-400">{scores.performanceScore}/100</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current Frame Rate"
          value={metrics.fps}
          unit="FPS"
          subtitle={`Min: ${metrics.minFps} | Max: ${metrics.maxFps}`}
          accentColor="cyan"
          sparklineData={history.slice(-15).map((m) => m.fps)}
          icon={<Activity className="w-4 h-4" />}
        />
        <MetricCard
          title="Average Frame Time"
          value={metrics.frameTime}
          unit="ms"
          subtitle={`Jitter: ±${metrics.frameTimeJitter}ms`}
          accentColor="purple"
          sparklineData={history.slice(-15).map((m) => m.frameTime)}
          icon={<Clock className="w-4 h-4" />}
        />
        <MetricCard
          title="Frame Drops Counter"
          value={metrics.frameDrops}
          unit="Frames"
          subtitle="Target: 60 FPS (16.6ms)"
          accentColor="amber"
          sparklineData={history.slice(-15).map((m) => m.frameDrops)}
          icon={<AlertTriangle className="w-4 h-4" />}
        />
        <MetricCard
          title="JS Execution Duration"
          value={metrics.jsExecutionTime}
          unit="ms"
          subtitle={`Long Tasks: ${metrics.longTasksCount}`}
          accentColor="rose"
          sparklineData={history.slice(-15).map((m) => m.jsExecutionTime)}
          icon={<Zap className="w-4 h-4" />}
        />
      </div>

      {/* FPS & Frame Time Chart */}
      <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Real-time FPS &amp; Frame Latency Timeline (Last 30 Seconds)
            </h3>
          </div>
        </div>
        <div className="h-[300px]">
          <FpsChart history={history} />
        </div>
      </div>
    </div>
  );
}
