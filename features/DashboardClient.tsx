"use client";

import { useState, useEffect } from "react";
import { OverviewCards } from "./OverviewCards";
import { Filters } from "./Filters";
import { KanbanBoard } from "./KanbanBoard";
import { CandidateTable } from "./CandidateTable";
import { CandidateDetailDrawer } from "./CandidateDetailDrawer";
import { LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function DashboardClient() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col space-y-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded"></div>
            <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md"></div>
          </div>
          <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
        <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md mt-6"></div>
        <div className="h-96 w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-lg mt-4"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center shrink-0 shadow-sm border border-black/10">
            <span className="text-white dark:text-zinc-900 text-sm font-bold tracking-tight">SF</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">Candidate Pipeline</h1>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Senior Frontend Engineer role</p>
          </div>
        </div>
        
        <div className="flex items-center bg-zinc-100/50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 rounded-md">
          <button
            onClick={() => setView("kanban")}
            className={cn("px-2.5 py-1.5 rounded-[4px] flex items-center justify-center transition-all cursor-pointer", view === "kanban" ? "bg-white dark:bg-[#222222] shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-black/5 dark:border-white/5 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300")}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setView("table")}
            className={cn("px-2.5 py-1.5 rounded-[4px] flex items-center justify-center transition-all cursor-pointer", view === "table" ? "bg-white dark:bg-[#222222] shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-black/5 dark:border-white/5 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300")}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <OverviewCards />
      <Filters />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={view}
           initial={{ opacity: 0, y: 5 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -5, position: "absolute", zIndex: -1 }}
           transition={{ duration: 0.15, ease: "easeOut" }}
           className="relative"
        >
          {view === "kanban" ? <KanbanBoard /> : <CandidateTable />}
        </motion.div>
      </AnimatePresence>

      <CandidateDetailDrawer />
    </div>
  );
}
