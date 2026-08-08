'use client';

import { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, EventObject } from 'cytoscape';
import { DependencyGraphData, GraphNodeData } from '@/types/graph';
import { formatBytes, formatDuration } from '@/lib/utils';
import { Layers, ZoomIn, ZoomOut, Maximize2, X, Activity, Server, FileCode, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface DependencyGraphProps {
  graphData: DependencyGraphData;
  layoutName?: string;
}

export default function DependencyGraph({ graphData, layoutName = 'concentric' }: DependencyGraphProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(null);
  const [activeLayout, setActiveLayout] = useState(layoutName);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cytoscape initialization
    const cy = cytoscape({
      container: containerRef.current,
      elements: [...graphData.nodes, ...graphData.edges],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#f8fafc',
            'font-family': 'monospace',
            'font-size': '11px',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'background-color': (node: any) => {
              const health = node.data('health');
              if (health === 'optimal') return '#10b981';
              if (health === 'warning') return '#f59e0b';
              return '#f43f5e';
            },
            'border-width': 3,
            'border-color': 'rgba(255, 255, 255, 0.2)',
            'width': (node: any) => {
              const type = node.data('type');
              if (type === 'application') return 36;
              if (type === 'page') return 28;
              return 20;
            },
            'height': (node: any) => {
              const type = node.data('type');
              if (type === 'application') return 36;
              if (type === 'page') return 28;
              return 20;
            },
            'overlay-color': '#06b6d4',
            'overlay-padding': 6,
            'overlay-opacity': 0.1,
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': 'rgba(56, 189, 248, 0.3)',
            'target-arrow-color': 'rgba(56, 189, 248, 0.6)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 0.8,
            'label': 'data(label)',
            'color': '#64748b',
            'font-size': '9px',
            'font-family': 'monospace',
            'text-rotation': 'autorotate',
            'text-margin-y': -8,
          },
        },
        {
          selector: ':selected',
          style: {
            'border-color': '#06b6d4',
            'border-width': 5,
            'line-color': '#06b6d4',
            'target-arrow-color': '#06b6d4',
          },
        },
      ],
      layout: {
        name: activeLayout,
        animate: true,
        animationDuration: 500,
        padding: 40,
      } as any,
    });

    cy.on('tap', 'node', (evt: EventObject) => {
      const nodeData = evt.target.data() as GraphNodeData;
      setSelectedNode(nodeData);
    });

    cy.on('tap', (evt: EventObject) => {
      if (evt.target === cy) {
        setSelectedNode(null);
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [graphData, activeLayout]);

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit();

  return (
    <div className="relative w-full h-[600px] rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border overflow-hidden shadow-2xl">
      {/* Top Floating Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-cyber-bg/90 p-1.5 rounded-xl border border-cyber-border backdrop-blur-md shadow-lg">
        <span className="text-xs font-mono font-semibold text-slate-300 px-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          Layout:
        </span>
        {(['concentric', 'breadthfirst', 'circle', 'grid'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setActiveLayout(l)}
            className={`px-2.5 py-1 text-[11px] font-mono rounded-lg capitalize transition-all ${
              activeLayout === l
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Top Right Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-cyber-bg/90 p-1.5 rounded-xl border border-cyber-border backdrop-blur-md shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleFit}
          className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-white/10"
          title="Reset Fit"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Health Legend */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4 bg-cyber-bg/90 px-3.5 py-2 rounded-xl border border-cyber-border text-[11px] font-mono backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
          <span className="text-slate-300">Optimal (&lt;20ms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
          <span className="text-slate-300">Warning (20-100ms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500" />
          <span className="text-slate-300">Critical (&gt;100ms)</span>
        </div>
      </div>

      {/* Cytoscape Canvas Render Viewport */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="absolute top-16 right-4 z-30 w-80 p-5 rounded-2xl bg-cyber-bg/95 backdrop-blur-cyber border border-cyan-500/40 shadow-2xl animate-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Node Inspector
              </span>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Node ID</span>
              <p className="font-bold text-white text-sm tracking-tight">{selectedNode.label}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-cyber-card border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase">Type</span>
                <p className="font-semibold text-cyan-300 capitalize">{selectedNode.type}</p>
              </div>
              <div className="p-2 rounded-lg bg-cyber-card border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase">Status</span>
                <div className="flex items-center gap-1 mt-0.5">
                  {selectedNode.health === 'optimal' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {selectedNode.health === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  {selectedNode.health === 'critical' && <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
                  <span className="capitalize font-bold text-white">{selectedNode.health}</span>
                </div>
              </div>
            </div>

            {selectedNode.latencyMs !== undefined && (
              <div className="p-2.5 rounded-lg bg-cyber-card border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Execution Latency</span>
                <span className="font-bold text-cyan-400">{formatDuration(selectedNode.latencyMs)}</span>
              </div>
            )}

            {selectedNode.sizeBytes !== undefined && (
              <div className="p-2.5 rounded-lg bg-cyber-card border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Transfer Size</span>
                <span className="font-bold text-purple-400">{formatBytes(selectedNode.sizeBytes)}</span>
              </div>
            )}

            {selectedNode.details && (
              <div className="p-2.5 rounded-lg bg-cyber-card border border-white/5 text-[11px] text-slate-300 leading-relaxed">
                {selectedNode.details}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
