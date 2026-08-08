'use client';

import { useState } from 'react';
import { Recommendation, PriorityLevel } from '@/types/ai';
import { Lightbulb, Sparkles, CheckCircle2, Code2, ArrowUpRight, ShieldAlert, AlertTriangle, Zap, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecommendationsViewProps {
  recommendations: Recommendation[];
}

export default function RecommendationsView({ recommendations }: RecommendationsViewProps) {
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [appliedFixes, setAppliedFixes] = useState<Record<string, boolean>>({});

  const filteredRecs = recommendations.filter((r) => {
    if (priorityFilter === 'all') return true;
    return r.priority === priorityFilter;
  });

  const handleApplyFix = (id: string) => {
    setAppliedFixes((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/30 via-purple-900/20 to-blue-900/20 border border-cyan-500/30 backdrop-blur-cyber shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-tight">
                AI Intelligent Optimization Command Center
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Continuously generated prescriptive fixes with priority severity, confidence scores, and code patches.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-cyber-card/80 border border-cyan-500/30 font-mono text-center">
            <span className="text-[10px] text-slate-400 uppercase block">ACTIVE INSIGHTS</span>
            <span className="text-xl font-bold text-cyan-400">{recommendations.length} Fixes</span>
          </div>
        </div>
      </div>

      {/* Priority Filter Strip */}
      <div className="flex items-center gap-2 bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-3 rounded-2xl shadow-lg font-mono text-xs">
        <span className="text-slate-400 font-semibold px-2">Filter Priority:</span>
        {['all', 'critical', 'high', 'medium', 'low'].map((p) => (
          <button
            key={p}
            onClick={() => setPriorityFilter(p)}
            className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
              priorityFilter === p
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredRecs.map((rec) => {
            const isApplied = appliedFixes[rec.id];

            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-6 rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border transition-all shadow-xl space-y-4 ${
                  isApplied ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-cyber-border hover:border-cyan-500/40'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        rec.priority === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        rec.priority === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}>
                        {rec.priority} PRIORITY
                      </span>
                      <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 capitalize">
                        {rec.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Severity: <strong className="text-white">{rec.severity}/100</strong>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-mono tracking-tight">{rec.title}</h3>
                  </div>

                  {/* Apply Fix Button */}
                  <button
                    onClick={() => handleApplyFix(rec.id)}
                    disabled={isApplied}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                      isApplied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        OPTIMIZATION APPLIED
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        APPLY OPTIMIZATION
                      </>
                    )}
                  </button>
                </div>

                {/* Reason & Details */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{rec.reason}</p>

                <div className="p-3 rounded-xl bg-cyber-bg/70 border border-white/5 text-xs font-mono text-slate-300">
                  <strong className="text-cyan-400 block mb-1">TECHNICAL ANALYSIS &amp; DIAGNOSTIC:</strong>
                  {rec.technicalDetails}
                </div>

                {/* Recommended Code Snippet */}
                {rec.codeSnippet && (
                  <div className="space-y-1.5 font-mono text-xs">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      SUGGESTED CODE IMPLEMENTATION:
                    </span>
                    <pre className="p-3 rounded-xl bg-slate-950 border border-white/10 text-cyan-300 text-xs overflow-x-auto custom-scrollbar">
                      <code>{rec.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Expected gains footer strip */}
                <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-3 text-xs font-mono">
                  <div className="flex items-center gap-4 text-slate-300">
                    <span>
                      Expected Impact: <strong className="text-emerald-400">{rec.expectedImprovement}</strong>
                    </span>
                    <span>
                      Perf Gain: <strong className="text-cyan-400">+{rec.estimatedPerformanceGain}%</strong>
                    </span>
                  </div>
                  <span className="text-purple-300 font-semibold">
                    AI Confidence: {rec.confidenceScore}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredRecs.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-cyber-card/80 border border-cyber-border text-slate-400 font-mono text-sm">
            No active recommendations for selected priority.
          </div>
        )}
      </div>
    </div>
  );
}
