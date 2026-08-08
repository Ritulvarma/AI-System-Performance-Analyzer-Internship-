export type NodeType = 
  | 'application' 
  | 'page' 
  | 'component' 
  | 'script' 
  | 'style' 
  | 'image' 
  | 'font' 
  | 'api' 
  | 'analytics' 
  | 'third-party';

export type NodeHealth = 'optimal' | 'warning' | 'critical';

export interface GraphNodeData {
  id: string;
  label: string;
  type: NodeType;
  health: NodeHealth;
  sizeBytes?: number;
  latencyMs?: number;
  details?: string;
  dependenciesCount?: number;
  url?: string;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  weight?: number;
  animated?: boolean;
}

export interface DependencyGraphData {
  nodes: { data: GraphNodeData }[];
  edges: { data: GraphEdgeData }[];
}
