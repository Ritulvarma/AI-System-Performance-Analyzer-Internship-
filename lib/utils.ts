import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0 || !bytes || isNaN(bytes)) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatDuration(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}µs`;
  if (ms < 1000) return `${ms.toFixed(1)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function getHealthColor(score: number): { text: string; bg: string; border: string; hex: string } {
  if (score >= 85) {
    return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', hex: '#10b981' };
  } else if (score >= 70) {
    return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', hex: '#06b6d4' };
  } else if (score >= 50) {
    return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', hex: '#f59e0b' };
  } else {
    return { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', hex: '#f43f5e' };
  }
}
