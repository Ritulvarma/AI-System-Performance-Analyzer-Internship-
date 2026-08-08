'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SystemMetrics, ScoreBreakdown, ResourceMetric } from '@/types/metrics';
import { Recommendation, ActivityItem } from '@/types/ai';
import { DashboardSettings } from '@/types/settings';
import { metricCollector } from '@/lib/metrics/collector';
import { calculateScoreBreakdown } from '@/lib/ai/scoreEngine';
import { generateRecommendations } from '@/lib/ai/recommendationEngine';

const DEFAULT_SETTINGS: DashboardSettings = {
  updateIntervalMs: 1000,
  animationSpeed: 'normal',
  graphLayout: 'concentric',
  enableParticles: true,
  enableSoundAlerts: false,
  maxHistorySnapshots: 90,
  highContrastMode: false,
};

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [scores, setScores] = useState<ScoreBreakdown | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [resources, setResources] = useState<ResourceMetric[]>([]);
  const [history, setHistory] = useState<SystemMetrics[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [settings, setSettings] = useState<DashboardSettings>(DEFAULT_SETTINGS);
  
  // Timeline playback state
  const [isPaused, setIsPaused] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState<number | null>(null);

  const prevMetricsRef = useRef<SystemMetrics | null>(null);

  const addActivity = useCallback((type: ActivityItem['type'], title: string, message: string, metric?: string, changeValue?: string) => {
    const newItem: ActivityItem = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      title,
      message,
      timestamp: Date.now(),
      metric,
      changeValue,
    };
    setActivityFeed((prev) => [newItem, ...prev].slice(0, 50));
  }, []);

  const updateTick = useCallback(() => {
    if (isPaused) return;

    const currentMetrics = metricCollector.collectMetrics();
    const currentResources = metricCollector.collectResources();
    const currentScores = calculateScoreBreakdown(currentMetrics);
    const currentRecs = generateRecommendations(currentMetrics, currentResources);

    setMetrics(currentMetrics);
    setScores(currentScores);
    setResources(currentResources);
    setRecommendations(currentRecs);

    // Buffer Timeline History
    setHistory((prev) => {
      const next = [...prev, currentMetrics];
      if (next.length > settings.maxHistorySnapshots) {
        return next.slice(next.length - settings.maxHistorySnapshots);
      }
      return next;
    });

    // Detect changes & generate Activity Feed events
    const prev = prevMetricsRef.current;
    if (prev) {
      // Memory Change
      const memDiff = currentMetrics.usedJSHeapSize - prev.usedJSHeapSize;
      if (Math.abs(memDiff) > 2500000) {
        const sign = memDiff > 0 ? '+' : '';
        const pct = ((memDiff / prev.usedJSHeapSize) * 100).toFixed(1);
        addActivity(
          memDiff > 0 ? 'warning' : 'info',
          memDiff > 0 ? 'Memory Surge' : 'Memory Released',
          `JS Heap adjusted by ${sign}${(memDiff / (1024 * 1024)).toFixed(1)} MB (${sign}${pct}%)`,
          'RAM',
          `${sign}${pct}%`
        );
      }

      // FPS drop
      if (prev.fps >= 50 && currentMetrics.fps < 45) {
        addActivity(
          'warning',
          'FPS Instability',
          `Frame rate dropped to ${currentMetrics.fps} FPS`,
          'FPS',
          `${currentMetrics.fps} FPS`
        );
      }

      // CPU spike
      if (currentMetrics.estimatedCpuLoad > 75 && prev.estimatedCpuLoad <= 75) {
        addActivity(
          'critical',
          'CPU Pressure Spike',
          `Estimated main thread load hit ${currentMetrics.estimatedCpuLoad}%`,
          'CPU',
          `${currentMetrics.estimatedCpuLoad}%`
        );
      }
    } else {
      addActivity(
        'ai_insight',
        'AI Engine Initialized',
        'Real-time continuous Web API performance observer started',
        'SYSTEM',
        'ACTIVE'
      );
    }

    prevMetricsRef.current = currentMetrics;
  }, [isPaused, settings.maxHistorySnapshots, addActivity]);

  useEffect(() => {
    updateTick();
    const timer = setInterval(updateTick, settings.updateIntervalMs);
    return () => clearInterval(timer);
  }, [updateTick, settings.updateIntervalMs]);

  const activeMetrics = selectedHistoryIndex !== null && history[selectedHistoryIndex] 
    ? history[selectedHistoryIndex] 
    : metrics;

  const activeScores = activeMetrics ? calculateScoreBreakdown(activeMetrics) : scores;

  return {
    metrics: activeMetrics,
    scores: activeScores,
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
    refreshMetrics: updateTick,
  };
}
