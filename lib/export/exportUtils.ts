import { SystemMetrics, ScoreBreakdown, ResourceMetric } from '@/types/metrics';
import { Recommendation } from '@/types/ai';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function exportAsJson(metrics: SystemMetrics, score: ScoreBreakdown, recommendations: Recommendation[], resources: ResourceMetric[]) {
  const data = {
    generatedAt: new Date().toISOString(),
    appName: 'AI System Performance Analyzer & Intelligent Optimization Assistant',
    scoreBreakdown: score,
    currentMetrics: metrics,
    recommendations,
    resources,
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `AI_Performance_Report_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportAsCsv(metricsHistory: SystemMetrics[]) {
  if (!metricsHistory || metricsHistory.length === 0) return;

  const headers = [
    'Timestamp',
    'FPS',
    'CPU Load %',
    'Used JS Heap (MB)',
    'Memory %',
    'FCP (ms)',
    'LCP (ms)',
    'CLS',
    'DOM Nodes',
    'Long Tasks',
    'RTT (ms)',
  ];

  const rows = metricsHistory.map(m => [
    new Date(m.timestamp).toISOString(),
    m.fps,
    m.estimatedCpuLoad,
    (m.usedJSHeapSize / (1024 * 1024)).toFixed(2),
    m.memoryUsagePercentage,
    m.fcp,
    m.lcp,
    m.cls,
    m.domNodeCount,
    m.longTasksCount,
    m.rtt,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', `AI_Performance_Metrics_Timeline_${Date.now()}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export async function exportAsPdf(elementId: string, metrics: SystemMetrics, scores: ScoreBreakdown) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const element = document.getElementById(elementId);
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#050816',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    } else {
      // Fallback text PDF generation
      doc.setFillColor(5, 8, 22);
      doc.rect(0, 0, 210, 297, 'F');
      
      doc.setTextColor(6, 182, 212);
      doc.setFontSize(20);
      doc.text('AI SYSTEM PERFORMANCE ANALYSIS REPORT', 15, 20);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 15, 30);
      doc.text(`Overall AI Health Score: ${scores.overallHealthScore}/100`, 15, 40);
      doc.text(`FPS: ${metrics.fps} | CPU Load: ${metrics.estimatedCpuLoad}%`, 15, 50);
      doc.text(`Used Memory: ${(metrics.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB (${metrics.memoryUsagePercentage}%)`, 15, 60);
      doc.text(`DOM Nodes: ${metrics.domNodeCount} | Long Tasks: ${metrics.longTasksCount}`, 15, 70);
    }

    doc.save(`AI_Performance_Diagnostic_Report_${Date.now()}.pdf`);
  } catch (err) {
    console.error('Error generating PDF export:', err);
  }
}
