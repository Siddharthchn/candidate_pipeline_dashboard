"use client";

import { useDashboardStore } from "@/hooks/useStore";
import { Stage, stages } from "@/lib/mockData";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Filters() {
  const { 
    searchQuery, setSearchQuery, 
    stageFilter, setStageFilter,
    experienceFilter, setExperienceFilter,
    scoreFilter, setScoreFilter,
  } = useDashboardStore();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 text-slate-900 dark:text-slate-100 placeholder:text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <button
              onClick={() => setStageFilter("All")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                stageFilter === "All"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              All
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 shrink-0"></div>
            {stages.map((stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage as Stage)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  stageFilter === stage
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 border rounded-xl transition-colors shadow-sm flex items-center gap-2 text-xs font-medium px-3 shrink-0 ${
              showFilters 
                ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 md:ml-2" 
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 md:ml-2"
            }`}
          >
            <Filter className="w-4 h-4" />
            More Filters
            <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-wrap gap-8 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Experience (Years)</label>
              <span className="text-xs text-slate-500 font-medium">{experienceFilter[0]} - {experienceFilter[1]} yrs</span>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" max="20" 
                value={experienceFilter[0]} 
                onChange={(e) => setExperienceFilter([Number(e.target.value), experienceFilter[1]])}
                className="w-full accent-blue-600"
              />
              <input 
                type="range" 
                min="0" max="20" 
                value={experienceFilter[1]} 
                onChange={(e) => setExperienceFilter([experienceFilter[0], Number(e.target.value)])}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
          
          <div className="w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Minimum Match Score</label>
              <span className="text-xs text-slate-500 font-medium">{scoreFilter}%</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" 
              value={scoreFilter} 
              onChange={(e) => setScoreFilter(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}
