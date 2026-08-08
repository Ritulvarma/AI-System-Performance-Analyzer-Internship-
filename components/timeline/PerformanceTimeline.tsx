'use client';

import { SystemMetrics } from '@/types/metrics';
import { History, Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface PerformanceTimelineProps {
  history: SystemMetrics[];
  selectedHistoryIndex: number | null;
  onSelectIndex: (index: number | null) => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export default function PerformanceTimeline({
  history,
  selectedHistoryIndex,
  onSelectIndex,
  isPaused,
  onTogglePause,
}: PerformanceTimelineProps) {
  if (history.length === 0) return null;

  const currentIndex = selectedHistoryIndex !== null ? selectedHistoryIndex : history.length - 1;
  const currentSnapshot = history[currentIndex];

  return (
    <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Performance Timeline &amp; Snapshot Scrubber
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono">
            {history.length} snapshots recorded
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          {currentSnapshot && (
            <span>
              {new Date(currentSnapshot.timestamp).toLocaleTimeString()}
            </span>
          )}
          {selectedHistoryIndex !== null && (
            <button
              onClick={() => onSelectIndex(null)}
              className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[10px] font-bold"
            >
              LIVE SNAPSHOT
            </button>
          )}
        </div>
      </div>

      {/* Scrubber Range Slider */}
      <div className="space-y-2">
        <input
          type="range"
          min={0}
          max={history.length - 1}
          value={currentIndex}
          onChange={(e) => {
            const idx = parseInt(e.target.value, 10);
            if (idx === history.length - 1) {
              onSelectIndex(null);
            } else {
              onSelectIndex(idx);
            }
          }}
          className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
        />

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>{history[0] ? new Date(history[0].timestamp).toLocaleTimeString() : ''}</span>
          <span className="text-cyan-400">
            {selectedHistoryIndex !== null ? `HISTORIC [${currentIndex + 1}/${history.length}]` : 'REAL-TIME STREAMING'}
          </span>
          <span>{history[history.length - 1] ? new Date(history[history.length - 1].timestamp).toLocaleTimeString() : ''}</span>
        </div>
      </div>
    </div>
  );
}
