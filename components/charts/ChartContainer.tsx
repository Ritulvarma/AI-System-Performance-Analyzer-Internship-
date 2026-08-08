'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Global Chart defaults for futuristic dark mode styling
ChartJS.defaults.color = '#94a3b8'; // Slate 400
ChartJS.defaults.font.family = 'monospace';
ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(13, 18, 43, 0.9)';
ChartJS.defaults.plugins.tooltip.borderColor = 'rgba(56, 189, 248, 0.3)';
ChartJS.defaults.plugins.tooltip.borderWidth = 1;
ChartJS.defaults.plugins.tooltip.padding = 10;

export default function ChartContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full min-h-[220px] relative">{children}</div>;
}
