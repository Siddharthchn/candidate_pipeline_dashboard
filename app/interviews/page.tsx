"use client";

import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";

export default function InterviewsPage() {
  const upcomingInterviews = [
    { candidate: "Siddharth Chauhan", role: "Senior Frontend Engineer", type: "Technical Round", date: "Today, 2:00 PM", duration: "45 min" },
    { candidate: "Prerna Tomar", role: "UX/UI Designer", type: "Portfolio Review", date: "Today, 4:30 PM", duration: "1 hr" },
    { candidate: "Ashish Singh", role: "Fullstack Developer", type: "Culture Fit", date: "Tomorrow, 10:00 AM", duration: "30 min" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">Interviews</h1>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Your upcoming schedule and calendar.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-[12px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2">Upcoming</h3>
          {upcomingInterviews.map((interview, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-[#111111] rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className="flex items-start gap-4 mb-3 sm:mb-0">
                <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/50">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-zinc-900 dark:text-zinc-100">{interview.candidate}</h4>
                  <p className="text-[12px] text-zinc-500">{interview.type} · {interview.role}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                    <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded"><Clock className="w-3 h-3" /> {interview.date}</span>
                    <span>{interview.duration}</span>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-md text-[13px] font-medium shadow-sm transition-all cursor-pointer">
                <Video className="w-4 h-4" /> Join Call
              </button>
            </div>
          ))}
        </div>
        
        <div>
          <div className="bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-lg p-5">
            <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Calendar Widget</h3>
            <div className="aspect-square bg-white dark:bg-[#1A1A1A] rounded border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-sm">
              [Placeholder for Calendar]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
