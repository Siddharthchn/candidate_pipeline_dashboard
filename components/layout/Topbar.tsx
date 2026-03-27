"use client";

import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-20 bg-[var(--background)] px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
        <span>Jobs</span>
        <span>/</span>
        <span className="font-medium text-slate-900 dark:text-slate-100">Senior Frontend Engineer</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64 shadow-sm"
          />
        </div>
        
        <button className="relative w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
          <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
        </button>
      </div>
    </header>
  );
}
