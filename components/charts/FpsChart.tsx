'use client';

import { Line } from 'react-chartjs-2';
import { SystemMetrics } from '@/types/metrics';
import ChartContainer from './ChartContainer';

interface FpsChartProps {
  history: SystemMetrics[];
}

export default function FpsChart({ history }: FpsChartProps) {
  const dataPoints = history.slice(-30);
  const labels = dataPoints.map((_, i) => `${dataPoints.length - i}s ago`);
  const fpsVals = dataPoints.map((m) => m.fps);
  const frameTimes = dataPoints.map((m) => m.frameTime);

  const data = {
    labels,
    datasets: [
      {
        label: 'FPS Rate',
        data: fpsVals,
        borderColor: '#3b82f6', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        yAxisID: 'y',
        pointRadius: 2,
      },
      {
        label: 'Frame Time (ms)',
        data: frameTimes,
        borderColor: '#f59e0b', // Amber
        borderWidth: 1.5,
        tension: 0.3,
        fill: false,
        yAxisID: 'y1',
        pointRadius: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        min: 0,
        max: 65,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { color: '#f59e0b', font: { size: 10 } },
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
