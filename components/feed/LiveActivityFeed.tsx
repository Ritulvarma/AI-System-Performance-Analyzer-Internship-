'use client';

import { ActivityItem } from '@/types/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, ShieldAlert, Sparkles, Info } from 'lucide-react';

interface LiveActivityFeedProps {
  activities: ActivityItem[];
}

export default function LiveActivityFeed({ activities }: LiveActivityFeedProps) {
  return (
    <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-4 shadow-xl flex flex-col h-[320px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Live AI Telemetry Feed
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        <AnimatePresence initial={false}>
          {activities.map((item) => {
            let Icon = Info;
            let iconStyle = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
            if (item.type === 'warning') {
              Icon = AlertTriangle;
              iconStyle = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
            } else if (item.type === 'critical') {
              Icon = ShieldAlert;
              iconStyle = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
            } else if (item.type === 'ai_insight') {
              Icon = Sparkles;
              iconStyle = 'text-purple-400 bg-purple-500/10 border-purple-500/30';
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="p-2.5 rounded-xl bg-cyber-bg/60 border border-white/5 flex items-start gap-3 hover:border-cyan-500/30 transition-colors"
              >
                <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${iconStyle}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 min-w-0 font-mono">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white truncate">{item.title}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug truncate mt-0.5">
                    {item.message}
                  </p>
                </div>

                {item.changeValue && (
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-white/5 border border-white/10 text-cyan-300 shrink-0">
                    {item.changeValue}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activities.length === 0 && (
          <div className="h-full flex items-center justify-center text-xs font-mono text-slate-500">
            Awaiting telemetry activity events...
          </div>
        )}
      </div>
    </div>
  );
}
