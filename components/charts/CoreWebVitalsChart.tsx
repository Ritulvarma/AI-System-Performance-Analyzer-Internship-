'use client';

import { Bar } from 'react-chartjs-2';
import { SystemMetrics } from '@/types/metrics';
import ChartContainer from './ChartContainer';

interface CoreWebVitalsChartProps {
  metrics: SystemMetrics | null;
}

export default function CoreWebVitalsChart({ metrics }: CoreWebVitalsChartProps) {
  if (!metrics) return null;

  const data = {
    labels: ['FCP (ms)', 'LCP (ms)', 'TTFB (ms)', 'INP (ms)', 'FID (ms)', 'CLS (x1000)'],
    datasets: [
      {
        label: 'Metric Value',
        data: [
          metrics.fcp,
          metrics.lcp,
          metrics.ttfb,
          metrics.inp,
          metrics.fid,
          Math.round(metrics.cls * 1000),
        ],
        backgroundColor: [
          '#06b6d4', // FCP Cyan
          '#3b82f6', // LCP Blue
          '#a855f7', // TTFB Purple
          '#10b981', // INP Emerald
          '#f59e0b', // FID Amber
          '#ec4899', // CLS Pink
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <ChartContainer>
      <Bar data={data} options={options} />
    </ChartContainer>
  );
}
