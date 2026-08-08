'use client';

import { Line } from 'react-chartjs-2';
import { SystemMetrics } from '@/types/metrics';
import ChartContainer from './ChartContainer';

interface MemoryChartProps {
  history: SystemMetrics[];
}

export default function MemoryChart({ history }: MemoryChartProps) {
  const dataPoints = history.slice(-30);
  const labels = dataPoints.map((_, i) => `${dataPoints.length - i}s ago`);
  const usedMB = dataPoints.map((m) => Number((m.usedJSHeapSize / (1024 * 1024)).toFixed(1)));
  const totalMB = dataPoints.map((m) => Number((m.totalJSHeapSize / (1024 * 1024)).toFixed(1)));

  const data = {
    labels,
    datasets: [
      {
        label: 'Used Heap (MB)',
        data: usedMB,
        borderColor: '#a855f7', // Purple
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 2,
      },
      {
        label: 'Total Heap Allocated (MB)',
        data: totalMB,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderDash: [5, 5],
        borderWidth: 1.5,
        tension: 0.1,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: { boxWidth: 10, font: { size: 10 } },
      },
    },
  };

  return (
    <ChartContainer>
      <Line data={data} options={options} />
    </ChartContainer>
  );
}
