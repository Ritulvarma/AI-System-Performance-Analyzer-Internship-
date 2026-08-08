'use client';

import {
  LayoutDashboard,
  Gauge,
  HardDrive,
  Cpu,
  Boxes,
  Network,
  Lightbulb,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type NavTab = 
  | 'dashboard'
  | 'performance'
  | 'memory'
  | 'cpu'
  | 'resources'
  | 'graph'
  | 'recommendations'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  recommendationsCount: number;
}

const NAV_ITEMS = [
  { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'performance' as NavTab, label: 'Performance', icon: Gauge },
  { id: 'memory' as NavTab, label: 'Memory', icon: HardDrive },
  { id: 'cpu' as NavTab, label: 'CPU', icon: Cpu },
  { id: 'resources' as NavTab, label: 'Resources', icon: Boxes },
  { id: 'graph' as NavTab, label: 'Dependency Graph', icon: Network },
  { id: 'recommendations' as NavTab, label: 'Recommendations', icon: Lightbulb, badge: true },
  { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
];

export default function Sidebar({
  activeTab,
  onTabChange,
  recommendationsCount,
}: SidebarProps) {
  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-cyber-bg/90 backdrop-blur-cyber border-r border-cyber-border p-4 flex flex-col justify-between shrink-0 shadow-2xl">
      {/* Upper Navigation Links */}
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
          ANALYTICS & ENGINES
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-blue-500/10 text-white border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-card/60 border border-transparent'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-4 h-4 transition-transform duration-200 group-hover:scale-110',
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && recommendationsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {recommendationsCount}
                </span>
              )}

              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-lg shadow-cyan-400/80" />
              )}
            </button>
          );
        })}
      </div>

      {/* Lower AI System Status Widget */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-b from-cyber-card/90 to-cyber-bg border border-cyan-500/20 relative overflow-hidden shadow-inner">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wider">
            AI Engine Active
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Continuously analyzing DOM mutations, frame drops & memory leaks every second.
        </p>
      </div>
    </aside>
  );
}
