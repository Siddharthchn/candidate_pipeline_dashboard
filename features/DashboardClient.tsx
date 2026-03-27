"use client";

import { useState, useEffect } from "react";
import { OverviewCards } from "./OverviewCards";
import { Filters } from "./Filters";
import { KanbanBoard } from "./KanbanBoard";
import { CandidateTable } from "./CandidateTable";
import { CandidateDetailDrawer } from "./CandidateDetailDrawer";
import { LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardClient() {
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [loading, setLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg"></div>
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
          ))}
        </div>
        <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl mt-4"></div>
        <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl mt-4"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Candidate Pipeline</h1>
          <p className="text-sm text-slate-600 mt-1">Manage and track candidates for the Senior Frontend Engineer role.</p>
        </div>
        
        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl shadow-sm">
          <button
            onClick={() => setView("kanban")}
            className={`p-2 rounded-lg transition-colors ${
              view === "kanban" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 scale-100" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-lg transition-colors ${
              view === "table" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 scale-100" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <OverviewCards />
      <Filters />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={view}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {view === "kanban" ? <KanbanBoard /> : <CandidateTable />}
        </motion.div>
      </AnimatePresence>

      <CandidateDetailDrawer />
    </>
  );
}
