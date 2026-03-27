"use client";

import { useDashboardStore } from "@/hooks/useStore";
import { Stage, stages } from "@/lib/mockData";
import { Search, Filter, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Filters() {
  const { 
    searchQuery, setSearchQuery, 
    stageFilter, setStageFilter,
    experienceFilter, setExperienceFilter,
    scoreFilter, setScoreFilter,
  } = useDashboardStore();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col bg-white dark:bg-[#111111] rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_3px_rgb(0,0,0,0.02)] mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2.5 gap-4">
        <div className="relative w-full md:w-80 shrink-0 group flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden focus-within:ring-2 ring-zinc-200 dark:ring-zinc-700 transition-shadow">
          <Search className="w-3.5 h-3.5 ml-3 text-zinc-400 group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200 transition-colors" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2.5 py-1.5 text-[13px] bg-transparent focus:outline-none transition-all placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <div className="flex items-center space-x-1.5 p-1">
            {["All", ...stages].map((stage) => {
              const isActive = stageFilter === stage;
              return (
                <button
                  key={stage}
                  onClick={() => setStageFilter(stage as Stage | "All")}
                  className={cn(
                    "px-2.5 py-1 rounded-[4px] text-[12px] font-semibold transition-colors whitespace-nowrap border flex items-center gap-1 cursor-pointer",
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm"
                      : "bg-white dark:bg-[#111111] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  {isActive && <Check className="w-3 h-3 shrink-0" />}
                  {stage}
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "px-3 py-1.5 rounded-md border flex items-center gap-1.5 text-[12px] font-medium transition-colors ml-auto shadow-sm cursor-pointer",
              showFilters 
                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100" 
                : "bg-white dark:bg-[#111111] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            Ext
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", showFilters ? "rotate-180" : "")} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0A0A0A] flex flex-wrap gap-8">
              <div className="w-full max-w-xs">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Experience</label>
                  <span className="text-[12px] text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-200/50 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{experienceFilter[0]} - {experienceFilter[1]}y</span>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" max="20" 
                    value={experienceFilter[0]} 
                    onChange={(e) => setExperienceFilter([Number(e.target.value), experienceFilter[1]])}
                    className="w-full accent-zinc-900 dark:accent-zinc-100 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none outline-none"
                  />
                  <input 
                    type="range" 
                    min="0" max="20" 
                    value={experienceFilter[1]} 
                    onChange={(e) => setExperienceFilter([experienceFilter[0], Number(e.target.value)])}
                    className="w-full accent-zinc-900 dark:accent-zinc-100 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none outline-none"
                  />
                </div>
              </div>
              
              <div className="w-full max-w-xs">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Min Score</label>
                  <span className="text-[12px] text-zinc-600 dark:text-zinc-400 font-mono bg-zinc-200/50 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{scoreFilter}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={scoreFilter} 
                  onChange={(e) => setScoreFilter(Number(e.target.value))}
                  className="w-full accent-zinc-900 dark:accent-zinc-100 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
