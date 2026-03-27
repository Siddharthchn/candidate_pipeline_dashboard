"use client";

import { Briefcase, MapPin, Users, ChevronRight, Plus } from "lucide-react";
import { jobOverview } from "@/lib/mockData";

export default function JobsPage() {
  const mockJobs = [
    { title: "Senior Frontend Engineer", location: "Gurugram, Delhi, Bengaluru", type: "Full-time", dept: "Product Engineering", applicants: 142, status: "Active" },
    { title: "Backend Developer", location: "Remote (India)", type: "Full-time", dept: "Core Systems", applicants: 89, status: "Active" },
    { title: "Product Designer", location: "Bengaluru, KA", type: "Full-time", dept: "Design", applicants: 215, status: "Active" },
    { title: "Marketing Manager", location: "Gurugram, HR", type: "Contract", dept: "Marketing", applicants: 45, status: "Draft" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">Job Postings</h1>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Manage all open roles and requisitions.</p>
        </div>
        <button className="flex items-center gap-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 rounded-md text-[13px] font-medium shadow-sm active:scale-95 transition-all cursor-pointer">
          <Plus className="w-4 h-4" /> New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockJobs.map((job, i) => (
          <div key={i} className="bg-white dark:bg-[#111111] rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all shadow-sm cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:scale-105 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${job.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700'}`}>
                {job.status}
              </span>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h3>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[12px] mb-4">
              <MapPin className="w-3.5 h-3.5" /> {job.location}
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-[12px]">
                <Users className="w-3.5 h-3.5" /> <span className="font-medium">{job.applicants} candidates</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
