'use client';

import { DependencyGraphData } from '@/types/graph';
import DependencyGraph from '../graph/DependencyGraph';
import { Network, Sparkles, Activity } from 'lucide-react';

interface GraphViewProps {
  graphData: DependencyGraphData;
}

export default function GraphView({ graphData }: GraphViewProps) {
  const nodeCount = graphData.nodes.length;
  const edgeCount = graphData.edges.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/30 via-purple-900/20 to-blue-900/20 border border-cyan-500/30 backdrop-blur-cyber shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-tight">
                Intelligent Dependency Graph &amp; Architecture Map
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Interactive Cytoscape.js network visualization of application core, pages, components, and third-party script links.
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-cyber-card/80 border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block">GRAPH NODES</span>
              <span className="font-bold text-cyan-400">{nodeCount} Nodes</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-cyber-card/80 border border-purple-500/30">
              <span className="text-[10px] text-slate-400 block">DEPENDENCIES</span>
              <span className="font-bold text-purple-400">{edgeCount} Edges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cytoscape Graph Container */}
      <DependencyGraph graphData={graphData} />
    </div>
  );
}
