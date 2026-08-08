'use client';

import { useState } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import ParticleBackground from '@/components/layout/ParticleBackground';
import Navbar from '@/components/layout/Navbar';
import Sidebar, { NavTab } from '@/components/layout/Sidebar';
import PerformanceTimeline from '@/components/timeline/PerformanceTimeline';
import OverviewDashboard from '@/components/views/OverviewDashboard';
import PerformanceView from '@/components/views/PerformanceView';
import MemoryView from '@/components/views/MemoryView';
import CpuView from '@/components/views/CpuView';
import ResourcesView from '@/components/views/ResourcesView';
import GraphView from '@/components/views/GraphView';
import RecommendationsView from '@/components/views/RecommendationsView';
import SettingsView from '@/components/views/SettingsView';
import { generateDependencyGraph } from '@/lib/graph/graphGenerator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  const {
    metrics,
    scores,
    recommendations,
    resources,
    history,
    activityFeed,
    settings,
    setSettings,
    isPaused,
    setIsPaused,
    selectedHistoryIndex,
    setSelectedHistoryIndex,
    refreshMetrics,
  } = usePerformanceMonitor();

  const graphData = metrics ? generateDependencyGraph(metrics) : { nodes: [], edges: [] };

  return (
    <div className="relative min-h-screen bg-[#050816] text-slate-100 flex flex-col font-sans overflow-x-hidden" id="dashboard-root">
      {/* Background Particle Animation */}
      <ParticleBackground enabled={settings.enableParticles} />

      {/* Top Fixed Header */}
      <Navbar
        scores={scores}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        onRefresh={refreshMetrics}
        activeView={activeTab}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden z-10">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          recommendationsCount={recommendations.length}
        />

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Performance Timeline Scrubber Bar */}
          <PerformanceTimeline
            history={history}
            selectedHistoryIndex={selectedHistoryIndex}
            onSelectIndex={setSelectedHistoryIndex}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
          />

          {/* Active View Switcher */}
          {activeTab === 'dashboard' && (
            <OverviewDashboard
              metrics={metrics}
              scores={scores}
              history={history}
              recommendations={recommendations}
              activityFeed={activityFeed}
              resources={resources}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'performance' && (
            <PerformanceView metrics={metrics} scores={scores} history={history} />
          )}

          {activeTab === 'memory' && (
            <MemoryView metrics={metrics} scores={scores} history={history} />
          )}

          {activeTab === 'cpu' && (
            <CpuView metrics={metrics} scores={scores} history={history} />
          )}

          {activeTab === 'resources' && (
            <ResourcesView resources={resources} />
          )}

          {activeTab === 'graph' && (
            <GraphView graphData={graphData} />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsView recommendations={recommendations} />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={setSettings}
              metrics={metrics}
              scores={scores}
              history={history}
              recommendations={recommendations}
              resources={resources}
            />
          )}
        </main>
      </div>
    </div>
  );
}
