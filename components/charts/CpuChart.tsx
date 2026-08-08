'use client';

import { Line } from 'react-chartjs-2';
import { SystemMetrics } from '@/types/metrics';
import ChartContainer from './ChartContainer';

interface CpuChartProps {
  history: SystemMetrics[];
}

export default function CpuChart({ history }: CpuChartProps) {
  const dataPoints = history.slice(-30);
  const labels = dataPoints.map((_, i) => `${dataPoints.length - i}s ago`);
  const cpuValues = dataPoints.map((m) => m.estimatedCpuLoad);

  const data = {
    labels,
    datasets: [
      {
        label: 'CPU Load (%)',
        data: cpuValues,
        borderColor: '#06b6d4', // Cyan
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: '#06b6d4',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
      x: {
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
      <Line data={data} options={options} />
    </ChartContainer>
  );
}
