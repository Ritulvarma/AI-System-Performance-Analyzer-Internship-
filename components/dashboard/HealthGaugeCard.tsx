'use client';

import { motion } from 'framer-motion';
import { getHealthColor } from '@/lib/utils';
import DynamicCounter from './DynamicCounter';

interface HealthGaugeCardProps {
  title: string;
  score: number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
}

export default function HealthGaugeCard({
  title,
  score,
  subtitle,
  icon,
  trend,
}: HealthGaugeCardProps) {
  const healthStyle = getHealthColor(score);

  // Arch SVG calculations: Arc from 180deg to 0deg (semi-circle)
  const radius = 42;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group rounded-2xl bg-cyber-card/70 backdrop-blur-cyber border border-cyber-border p-5 hover:border-cyan-500/40 transition-all duration-300 shadow-xl overflow-hidden"
    >
      {/* Background glow spotlight */}
      <div 
        className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-500 group-hover:opacity-40"
        style={{ backgroundColor: healthStyle.hex }}
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-cyan-400 p-1.5 rounded-lg bg-cyber-card/80 border border-white/5">{icon}</div>}
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">{title}</span>
        </div>
        {trend && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-white/5 border border-white/10 text-slate-300">
            {trend}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        {/* Semi-circle Gauge */}
        <div className="relative w-28 h-16 flex items-end justify-center">
          <svg className="w-28 h-24 transform -rotate-180" viewBox="0 0 100 60">
            {/* Background Arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Foreground Progress Arc */}
            <motion.path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke={healthStyle.hex}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>

          {/* Centered Percentage */}
          <div className="absolute bottom-1 flex flex-col items-center">
            <span className="text-2xl font-extrabold tracking-tight text-white font-mono leading-none">
              <DynamicCounter value={score} decimals={0} suffix="%" />
            </span>
          </div>
        </div>

        {/* Status indicator pill & details */}
        <div className="flex flex-col items-end gap-1">
          <div className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono ${healthStyle.bg} ${healthStyle.text} border ${healthStyle.border}`}>
            {score >= 85 ? 'OPTIMAL' : score >= 70 ? 'GOOD' : score >= 50 ? 'WARNING' : 'CRITICAL'}
          </div>
          {subtitle && <span className="text-[11px] text-slate-400 text-right max-w-[110px] truncate">{subtitle}</span>}
        </div>
      </div>
    </motion.div>
  );
}
