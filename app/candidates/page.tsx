"use client";

import { Search, Filter, MoreHorizontal } from "lucide-react";
import { mockCandidates } from "@/lib/mockData";

export default function CandidatesPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">All Candidates</h1>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Manage and search your entire global talent pool.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-md text-[13px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shadow-sm cursor-pointer">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 rounded-md text-[13px] font-medium shadow-sm active:scale-95 transition-all cursor-pointer">
            Add Candidate
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_3px_rgb(0,0,0,0.02)] overflow-hidden">
        <table className="w-full text-left text-[13px] text-zinc-600 dark:text-zinc-400 border-collapse">
          <thead className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-5 py-3">Candidate</th>
              <th className="px-5 py-3">Role applied</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCandidates.map((c) => (
              <tr key={c.id} className="border-b border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-500">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[13px] text-zinc-900 dark:text-zinc-100">{c.name}</div>
                      <div className="text-[12px] text-zinc-500">{c.email || `${c.name.split(' ')[0].toLowerCase()}@example.com`}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 font-medium text-zinc-700 dark:text-zinc-300">{c.role}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded text-[11px] font-semibold border border-zinc-200/60 dark:border-zinc-700/60">
                    LinkedIn
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
