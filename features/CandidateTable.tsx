"use client";

import { useDashboardStore } from "@/hooks/useStore";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

export function CandidateTable() {
  const { candidates, stageFilter, searchQuery, selectCandidate, experienceFilter, scoreFilter } = useDashboardStore();

  const filteredCandidates = candidates.filter((c) => {
    const matchesStage = stageFilter === "All" || c.stage === stageFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExperience = c.experience >= experienceFilter[0] && c.experience <= experienceFilter[1];
    const matchesScore = c.score >= scoreFilter;
    return matchesStage && matchesSearch && matchesExperience && matchesScore;
  });

  return (
    <div className="bg-white dark:bg-[#111111] rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_3px_rgb(0,0,0,0.02)] overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px] text-zinc-600 dark:text-zinc-400 border-collapse">
          <thead className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900/50 sticky top-0 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-5 py-3 whitespace-nowrap group cursor-pointer transition-colors hover:text-zinc-600">
                <div className="flex items-center gap-1.5">
                  <span>Candidate</span>
                  <ArrowUpDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900" />
                </div>
              </th>
              <th className="px-5 py-3 whitespace-nowrap">Current Role</th>
              <th className="px-5 py-3 whitespace-nowrap">Experience</th>
              <th className="px-5 py-3 whitespace-nowrap">Match Score</th>
              <th className="px-5 py-3 whitespace-nowrap">Status</th>
              <th className="px-5 py-3 whitespace-nowrap">Last Activity</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-zinc-400">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">No candidates found</span>
                    <span className="text-[13px]">Try adjusting your filters or search query</span>
                  </div>
                </td>
              </tr>
            ) : null}
            {filteredCandidates.map((c) => (
              <tr 
                key={c.id} 
                className="bg-white dark:bg-[#111111] border-b border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer group"
                onClick={() => selectCandidate(c.id)}
              >
                <td className="px-5 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                    <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-500">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[13px] leading-tight group-hover:underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4">{c.name}</div>
                      <div className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">{c.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap font-medium text-zinc-700 dark:text-zinc-300">{c.company}</td>
                <td className="px-5 py-3 whitespace-nowrap tabular-nums">{c.experience} yrs</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-900 dark:text-zinc-100">{c.score}%</span>
                    <div className="h-1.5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full" style={{ width: `${c.score}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded text-[11px] font-semibold border border-zinc-200/60 dark:border-zinc-700/60">
                    {c.stage}
                  </span>
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                  {c.lastActivity}
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
