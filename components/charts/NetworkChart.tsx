'use client';

import { Bar } from 'react-chartjs-2';
import { SystemMetrics } from '@/types/metrics';
import ChartContainer from './ChartContainer';

interface NetworkChartProps {
  history: SystemMetrics[];
}

export default function NetworkChart({ history }: NetworkChartProps) {
  const dataPoints = history.slice(-20);
  const labels = dataPoints.map((_, i) => `${dataPoints.length - i}s`);
  const rttVals = dataPoints.map((m) => m.rtt);
  const downlinkVals = dataPoints.map((m) => m.downlink * 10);

  const data = {
    labels,
    datasets: [
      {
        label: 'Network RTT Latency (ms)',
        data: rttVals,
        backgroundColor: 'rgba(6, 182, 212, 0.6)',
        borderRadius: 4,
      },
      {
        label: 'Downlink Speed (x10 Mbps)',
        data: downlinkVals,
        backgroundColor: 'rgba(168, 85, 247, 0.6)',
        borderRadius: 4,
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
      <Bar data={data} options={options} />
    </ChartContainer>
  );
}
