export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';
export type RecommendationCategory = 
  | 'javascript' 
  | 'dom' 
  | 'images' 
  | 'css' 
  | 'network' 
  | 'memory' 
  | 'rendering' 
  | 'fonts' 
  | 'caching' 
  | 'third-party' 
  | 'fps';

export interface Recommendation {
  id: string;
  title: string;
  category: RecommendationCategory;
  priority: PriorityLevel;
  severity: number; // 0-100
  reason: string;
  technicalDetails: string;
  suggestedAction: string;
  codeSnippet?: string;
  expectedImprovement: string;
  estimatedPerformanceGain: number; // %
  confidenceScore: number; // 0-100%
  affectedResources?: string[];
  timestamp: number;
}

export type ActivityType = 'info' | 'warning' | 'critical' | 'ai_insight' | 'optimization';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  message: string;
  timestamp: number;
  metric?: string;
  changeValue?: string;
}
