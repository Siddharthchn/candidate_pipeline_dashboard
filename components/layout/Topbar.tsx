"use client";

import { Bell, HelpCircle } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-14 bg-white dark:bg-[#111111] border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-2 text-[13px]">
        <span className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer font-medium">Jobs</span>
        <span className="text-zinc-300 dark:text-zinc-700">/</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-medium">Senior Frontend Engineer</span>
      </div>

      <div className="flex items-center space-x-3">
        <button className="relative w-8 h-8 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
          <HelpCircle className="w-4 h-4 stroke-[2]" />
        </button>
        <button className="relative w-8 h-8 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
          <Bell className="w-4 h-4 stroke-[2]" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#111111]"></span>
        </button>
      </div>
    </header>
  );
}
