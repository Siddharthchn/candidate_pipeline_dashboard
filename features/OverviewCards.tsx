"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, MapPin, Target } from "lucide-react";
import { jobOverview } from "@/lib/mockData";

export function OverviewCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  const stats = [
    { label: "Total Applicants", value: jobOverview.totalApplicants, icon: Users },
    { label: "Open Positions", value: jobOverview.openPositions, icon: Target },
    { label: "Department", value: jobOverview.department, icon: Briefcase, isText: true },
    { label: "Location", value: jobOverview.location, icon: MapPin, isText: true },
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={item}
          className="bg-white dark:bg-[#111111] rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_3px_rgb(0,0,0,0.02)] flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium tracking-tight truncate">{stat.label}</p>
            <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700`}>
              <stat.icon className={`w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300 stroke-[2]`} />
            </div>
          </div>
          <div>
            <p className={`font-semibold text-zinc-900 dark:text-zinc-50 truncate ${stat.isText ? 'text-sm' : 'text-2xl tracking-tight'}`}>
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
