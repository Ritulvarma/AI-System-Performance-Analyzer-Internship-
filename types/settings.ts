export interface DashboardSettings {
  updateIntervalMs: number; // 500, 1000, 2000, 5000
  animationSpeed: 'off' | 'slow' | 'normal' | 'fast';
  graphLayout: 'concentric' | 'breadthfirst' | 'circle' | 'grid' | 'random';
  enableParticles: boolean;
  enableSoundAlerts: boolean;
  maxHistorySnapshots: number; // 60 to 300
  highContrastMode: boolean;
}
