'use client';

import { useState } from 'react';
import { ResourceMetric } from '@/types/metrics';
import { formatBytes, formatDuration } from '@/lib/utils';
import { Boxes, Search, ArrowUpDown, FileCode, Image as ImageIcon, Type, Globe, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ResourcesViewProps {
  resources: ResourceMetric[];
}

export default function ResourcesView({ resources }: ResourcesViewProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'size' | 'duration' | 'name'>('size');

  const filteredResources = resources.filter((r) => {
    const matchesType = filterType === 'all' || r.type === filterType;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'size') return b.transferSize - a.transferSize;
    if (sortBy === 'duration') return b.duration - a.duration;
    return a.name.localeCompare(b.name);
  });

  // Top Statistics
  const totalPayload = resources.reduce((sum, r) => sum + r.transferSize, 0);
  const totalDuration = resources.reduce((sum, r) => sum + r.duration, 0);
  const renderBlockingCount = resources.filter((r) => r.renderBlocking).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/30 via-blue-900/20 to-purple-900/20 border border-cyan-500/30 backdrop-blur-cyber shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white uppercase font-mono tracking-tight">
                Resource Timing &amp; Asset Payload Analyzer
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Inspect network request payloads, script durations, image asset sizes, and render-blocking tags.
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-cyber-card/80 border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block">TOTAL ASSETS</span>
              <span className="font-bold text-cyan-400">{resources.length} Requests</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-cyber-card/80 border border-purple-500/30">
              <span className="text-[10px] text-slate-400 block">TOTAL PAYLOAD</span>
              <span className="font-bold text-purple-400">{formatBytes(totalPayload)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border p-4 rounded-2xl shadow-lg">
        {/* Type Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'script', 'stylesheet', 'image', 'font', 'fetch'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 text-xs font-mono rounded-xl capitalize transition-all shrink-0 ${
                filterType === t
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search & Sort dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cyber-bg/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
          </div>

          <div className="flex items-center gap-1 bg-cyber-bg/80 p-1 rounded-xl border border-white/10 text-xs font-mono text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400 ml-2" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-mono text-white focus:outline-none px-2 py-1"
            >
              <option value="size" className="bg-slate-900">Sort by Size</option>
              <option value="duration" className="bg-slate-900">Sort by Duration</option>
              <option value="name" className="bg-slate-900">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resource Table */}
      <div className="rounded-2xl bg-cyber-card/80 backdrop-blur-cyber border border-cyber-border overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-cyber-bg/80 border-b border-cyber-border text-slate-400 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-4">Resource Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Transfer Size</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Render Blocking</th>
                <th className="p-4">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {sortedResources.map((res) => {
                let TypeIcon = FileCode;
                let typeColor = 'text-cyan-400';
                if (res.type === 'image') { TypeIcon = ImageIcon; typeColor = 'text-purple-400'; }
                else if (res.type === 'font') { TypeIcon = Type; typeColor = 'text-emerald-400'; }
                else if (res.type === 'stylesheet') { TypeIcon = FileCode; typeColor = 'text-blue-400'; }
                else if (res.type === 'fetch') { TypeIcon = Globe; typeColor = 'text-amber-400'; }

                return (
                  <tr key={res.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 max-w-[280px] truncate font-bold text-white">
                      <div className="flex items-center gap-2">
                        <TypeIcon className={`w-4 h-4 ${typeColor} shrink-0`} />
                        <span className="truncate" title={res.url}>{res.name}</span>
                      </div>
                    </td>
                    <td className="p-4 capitalize">
                      <span className={`px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 ${typeColor}`}>
                        {res.type}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-purple-300">{formatBytes(res.transferSize)}</td>
                    <td className="p-4 font-bold text-cyan-300">{formatDuration(res.duration)}</td>
                    <td className="p-4">
                      {res.renderBlocking ? (
                        <span className="flex items-center gap-1 text-rose-400 font-bold text-[10px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 w-fit">
                          <ShieldAlert className="w-3 h-3" />
                          BLOCKING
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                          <CheckCircle2 className="w-3 h-3" />
                          Async
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-500">{res.protocol.toUpperCase()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
