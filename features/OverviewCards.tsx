"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, MapPin, Target } from "lucide-react";
import { jobOverview } from "@/lib/mockData";

export function OverviewCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const stats = [
    { label: "Total Applicants", value: jobOverview.totalApplicants, icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30", border: "border-blue-200 dark:border-blue-800" },
    { label: "Open Positions", value: jobOverview.openPositions, icon: Target, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30", border: "border-emerald-200 dark:border-emerald-800" },
    { label: "Department", value: jobOverview.department, icon: Briefcase, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", border: "border-purple-200 dark:border-purple-800", isText: true },
    { label: "Location", value: jobOverview.location, icon: MapPin, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30", border: "border-amber-200 dark:border-amber-800", isText: true },
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm cursor-default"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 truncate">{stat.label}</p>
              <p className={`font-semibold text-slate-900 dark:text-white truncate ${stat.isText ? 'text-lg' : 'text-2xl'}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
