'use client';

import { DashboardSettings } from '@/types/settings';
import { SystemMetrics, ScoreBreakdown, ResourceMetric } from '@/types/metrics';
import { Recommendation } from '@/types/ai';
import { exportAsJson, exportAsCsv, exportAsPdf } from '@/lib/export/exportUtils';
import { Settings, Download, RefreshCw, Sliders, ShieldCheck, Sparkles, FileText, FileSpreadsheet, FileJson } from 'lucide-react';

interface SettingsViewProps {
  settings: DashboardSettings;
  onUpdateSettings: (newSettings: DashboardSettings) => void;
  metrics: SystemMetrics | null;
  scores: ScoreBreakdown | null;
  history: SystemMetrics[];
  recommendations: Recommendation[];
  resources: ResourceMetric[];
}

export default function SettingsView({
  settings,
  onUpdateSettings,
  metrics,
  scores,
  history,
  recommendations,
  resources,
}: SettingsViewProps) {
  const handleExportJson = () => {
    if (metrics && scores) {
      exportAsJson(metrics, scores, recommendations, resources);
    }
  };

  const handleExportCsv = () => {
    exportAsCsv(history);
  };

  const handleExportPdf = () => {
    if (metrics && scores) {
      exportAsPdf('dashboard-root', metrics, scores);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/30 via-purple-900/20 to-blue-900/20 border border-cyan-500/30 backdrop-blur-cyber shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-tight">
                System Engine Settings &amp; Report Export
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Configure telemetry sampling rates, background particle rendering, and generate downloadable reports.
            </p>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Download className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Export Performance Diagnostic Report
          </h3>
        </div>

        <p className="text-xs text-slate-300 font-sans">
          Download structured real-time metrics, historical telemetry logs, and AI optimization recommendations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <button
            onClick={handleExportPdf}
            className="p-4 rounded-xl bg-cyber-bg/80 border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-between text-cyan-300 font-bold transition-all shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-cyan-400" />
              <div className="text-left">
                <span className="block text-white">Export PDF</span>
                <span className="text-[10px] text-slate-400 font-normal">Formatted Report</span>
              </div>
            </div>
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportJson}
            className="p-4 rounded-xl bg-cyber-bg/80 border border-purple-500/40 hover:border-purple-400 flex items-center justify-between text-purple-300 font-bold transition-all shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex items-center gap-3">
              <FileJson className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <span className="block text-white">Export JSON</span>
                <span className="text-[10px] text-slate-400 font-normal">Raw Telemetry Dump</span>
              </div>
            </div>
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCsv}
            className="p-4 rounded-xl bg-cyber-bg/80 border border-emerald-500/40 hover:border-emerald-400 flex items-center justify-between text-emerald-300 font-bold transition-all shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <span className="block text-white">Export CSV</span>
                <span className="text-[10px] text-slate-400 font-normal">Timeline History</span>
              </div>
            </div>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Configuration */}
      <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Sliders className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Telemetry &amp; Visual Engine Configuration
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Update Frequency */}
          <div className="p-4 rounded-xl bg-cyber-bg/60 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Telemetry Update Interval</span>
              <span className="text-cyan-400 font-bold">{settings.updateIntervalMs}ms</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[500, 1000, 2000, 5000].map((ms) => (
                <button
                  key={ms}
                  onClick={() => onUpdateSettings({ ...settings, updateIntervalMs: ms })}
                  className={`py-1.5 rounded-lg border text-center font-bold transition-all ${
                    settings.updateIntervalMs === ms
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Particles Toggle */}
          <div className="p-4 rounded-xl bg-cyber-bg/60 border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-white font-bold block">Ambient Particle Field</span>
              <span className="text-[11px] text-slate-400 font-normal">Futuristic canvas background animation</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, enableParticles: !settings.enableParticles })}
              className={`px-4 py-2 rounded-xl font-bold border transition-all ${
                settings.enableParticles
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              {settings.enableParticles ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
