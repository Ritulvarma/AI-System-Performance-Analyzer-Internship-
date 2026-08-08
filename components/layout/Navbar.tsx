'use client';

import { useState, useEffect } from 'react';
import { Activity, Play, Pause, RefreshCw, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { ScoreBreakdown } from '@/types/metrics';
import { getHealthColor } from '@/lib/utils';

interface NavbarProps {
  scores: ScoreBreakdown | null;
  isPaused: boolean;
  onTogglePause: () => void;
  onRefresh: () => void;
  activeView: string;
}

export default function Navbar({
  scores,
  isPaused,
  onTogglePause,
  onRefresh,
  activeView,
}: NavbarProps) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    setSecondsAgo(0);
    const interval = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [scores]);

  const healthStyle = scores ? getHealthColor(scores.overallHealthScore) : { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-cyber-bg/80 backdrop-blur-cyber border-b border-cyber-border px-6 flex items-center justify-between shadow-2xl">
      {/* Left section: Branding & Title */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 border border-cyan-500/30 shadow-lg">
          <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md -z-10 animate-pulse-glow" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-white uppercase font-mono">
              AI System Performance Analyzer
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
              v2.5 PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="text-cyan-400 font-semibold uppercase">{activeView}</span>
            <span>•</span>
            <span>Intelligent Optimization Assistant</span>
          </p>
        </div>
      </div>

      {/* Center / Right section: Controls & Live Badges */}
      <div className="flex items-center gap-3">
        {/* Overall Health Score Pill */}
        {scores && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${healthStyle.bg} border ${healthStyle.border} transition-all`}>
            <ShieldCheck className={`w-4 h-4 ${healthStyle.text}`} />
            <div className="flex items-baseline gap-1 font-mono text-xs font-bold">
              <span className="text-slate-300 text-[11px]">AI HEALTH:</span>
              <span className={healthStyle.text}>{scores.overallHealthScore}/100</span>
            </div>
          </div>
        )}

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-card/80 border border-cyber-border">
          <span className="relative flex h-2.5 w-2.5">
            {!isPaused && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPaused ? 'bg-amber-400' : 'bg-cyan-400'}`} />
          </span>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            {isPaused ? 'PAUSED' : 'LIVE MONITORING'}
          </span>
        </div>

        {/* Timer Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyber-card/60 border border-white/5 text-xs text-slate-400 font-mono">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Updated {secondsAgo}s ago</span>
        </div>

        {/* Refresh & Pause Buttons */}
        <div className="flex items-center gap-1 bg-cyber-card/90 p-1 rounded-xl border border-cyber-border">
          <button
            onClick={onTogglePause}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title={isPaused ? 'Resume Monitoring' : 'Pause Monitoring'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          </button>
          <button
            onClick={onRefresh}
            className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-colors"
            title="Force Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
