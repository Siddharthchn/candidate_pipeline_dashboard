"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: Users, label: "Candidates", href: "/candidates" },
  { icon: Briefcase, label: "Jobs", href: "/jobs" },
  { icon: Calendar, label: "Interviews", href: "/interviews" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-6 px-4 relative z-20 shrink-0 shadow-sm"
    >
      <div className="flex items-center w-full mb-10 overflow-hidden px-2">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-3 font-semibold text-lg text-slate-800 dark:text-slate-100 whitespace-nowrap"
          >
            HireSync
          </motion.span>
        )}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 shadow-sm transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <nav className="flex-1 w-full space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center px-2 py-3 mb-1 rounded-xl transition-all duration-200 group cursor-pointer",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isCollapsed ? "mx-auto" : "ml-2")} />
                {!isCollapsed && (
                  <span className="ml-3 font-medium whitespace-nowrap">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="w-full mt-auto">
        <div className="flex items-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
           <img src="https://i.pravatar.cc/150?u=recruiter" alt="User" className="w-8 h-8 rounded-full shrink-0" />
           {!isCollapsed && (
             <div className="ml-3 overflow-hidden">
               <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">Sarah Connor</p>
               <p className="text-xs text-slate-500 truncate">Lead Recruiter</p>
             </div>
           )}
        </div>
      </div>
    </motion.aside>
  );
}
