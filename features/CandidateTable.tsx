"use client";

import { useDashboardStore } from "@/hooks/useStore";
import { Stage } from "@/lib/mockData";
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 dark:text-slate-200 uppercase bg-slate-50 dark:bg-slate-800/50 sticky top-0 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold whitespace-nowrap group cursor-pointer transition-colors hover:text-blue-600">
                <div className="flex items-center space-x-1">
                  <span>Candidate</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                </div>
              </th>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">Current Role</th>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">Experience</th>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">Match Score</th>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">Status</th>
              <th className="px-6 py-4 font-semibold whitespace-nowrap">Last Activity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-1">No candidates found</span>
                    <span>Try adjusting your filters or search query</span>
                  </div>
                </td>
              </tr>
            ) : null}
            {filteredCandidates.map((c) => (
              <tr 
                key={c.id} 
                className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                onClick={() => selectCandidate(c.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3 text-slate-900 dark:text-white">
                    <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full shadow-sm object-cover" />
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{c.role}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{c.company}</td>
                <td className="px-6 py-4 whitespace-nowrap">{c.experience} yrs</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-amber-600 dark:text-amber-500">{c.score}%</span>
                    <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${c.score}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold shadow-sm border border-blue-100 dark:border-blue-900/50">
                    {c.stage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                  {c.lastActivity}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
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
