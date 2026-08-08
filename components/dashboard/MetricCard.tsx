'use client';

import { motion } from 'framer-motion';
import DynamicCounter from './DynamicCounter';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  decimals?: number;
  unit?: string;
  prefix?: string;
  subtitle?: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  sparklineData?: number[];
  accentColor?: 'cyan' | 'purple' | 'blue' | 'emerald' | 'amber' | 'rose';
  className?: string;
}

const colorMap = {
  cyan: { border: 'group-hover:border-cyan-500/50', text: 'text-cyan-400', glow: 'bg-cyan-500/20' },
  purple: { border: 'group-hover:border-purple-500/50', text: 'text-purple-400', glow: 'bg-purple-500/20' },
  blue: { border: 'group-hover:border-blue-500/50', text: 'text-blue-400', glow: 'bg-blue-500/20' },
  emerald: { border: 'group-hover:border-emerald-500/50', text: 'text-emerald-400', glow: 'bg-emerald-500/20' },
  amber: { border: 'group-hover:border-amber-500/50', text: 'text-amber-400', glow: 'bg-amber-500/20' },
  rose: { border: 'group-hover:border-rose-500/50', text: 'text-rose-400', glow: 'bg-rose-500/20' },
};

export default function MetricCard({
  title,
  value,
  decimals = 0,
  unit = '',
  prefix = '',
  subtitle,
  icon,
  sparklineData,
  accentColor = 'cyan',
  className,
}: MetricCardProps) {
  const styles = colorMap[accentColor];

  // SVG Sparkline calculation
  const points = sparklineData && sparklineData.length > 1 ? sparklineData : [10, 15, 12, 20, 18, 25, 22];
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const svgWidth = 80;
  const svgHeight = 24;
  const normalizedPoints = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * svgWidth;
    const y = svgHeight - ((val - min) / (max - min || 1)) * (svgHeight - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative group rounded-2xl bg-cyber-card/70 backdrop-blur-cyber border border-cyber-border p-4 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden',
        styles.border,
        className
      )}
    >
      <div className={cn('absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none', styles.glow)} />

      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 truncate">{title}</span>
        {icon && <div className={cn('p-1.5 rounded-lg bg-cyber-card border border-white/5', styles.text)}>{icon}</div>}
      </div>

      <div className="flex items-baseline justify-between mt-3">
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-2xl font-black text-white tracking-tight">
            <DynamicCounter value={value} decimals={decimals} prefix={prefix} />
          </span>
          {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
        </div>

        {/* Sparkline Visualizer */}
        <div className="w-20 h-6">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.text}
              points={normalizedPoints}
            />
          </svg>
        </div>
      </div>

      {subtitle && (
        <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-slate-400">
          <span>{subtitle}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
      )}
    </motion.div>
  );
}
