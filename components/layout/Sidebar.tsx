"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, PanelLeftClose, PanelLeft, Search } from "lucide-react";
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={cn(
        "h-screen flex flex-col transition-all duration-300 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#111111] shrink-0",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center w-full px-4 h-14 shrink-0">
        <div className="w-6 h-6 rounded bg-zinc-900 dark:bg-white flex items-center justify-center shrink-0 shadow-sm">
          <Briefcase className="w-3.5 h-3.5 text-white dark:text-black stroke-[2.5]" />
        </div>
        {!isCollapsed && (
          <span className="ml-2.5 font-bold text-[14px] text-zinc-900 dark:text-zinc-100 tracking-tight">
            HireSync
          </span>
        )}
      </div>

      <div className="px-3 mb-2">
        <button className={cn("flex items-center w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm cursor-pointer", isCollapsed ? "justify-center h-8" : "px-2 py-1.5")}>
          <Search className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span className="text-[13px] ml-2">Search...</span>}
          {!isCollapsed && <kbd className="ml-auto text-[10px] font-sans bg-zinc-100 dark:bg-zinc-800 px-1.5 rounded text-zinc-400 border border-zinc-200 dark:border-zinc-700">⌘K</kbd>}
        </button>
      </div>

      <div className="flex-1 w-full px-3 py-2 space-y-0.5 overflow-y-auto">
        {!isCollapsed && <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-2 mt-4">Platform</div>}
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link key={item.href} href={item.href} className="outline-none block">
              <div
                className={cn(
                  "flex items-center rounded-md transition-colors cursor-pointer group text-[13px] font-medium",
                  isCollapsed ? "justify-center h-8" : "px-2 py-1.5",
                  isActive
                    ? "bg-zinc-200/50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0 stroke-[2]", isActive ? "text-zinc-900 dark:text-zinc-200" : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300", !isCollapsed && "mr-2.5")} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="w-full mt-auto border-t border-zinc-200 dark:border-zinc-800 p-3 flex flex-col gap-2">
        <div className="flex items-center group cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80 rounded-md transition-colors p-1.5">
          <img src="https://i.pravatar.cc/150?u=recruiter1" alt="User" className="w-6 h-6 rounded-md object-cover border border-zinc-200 dark:border-zinc-700" />
          {!isCollapsed && (
            <div className="ml-2.5 overflow-hidden flex-1">
              <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 truncate">Siddharth Singh</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("flex items-center justify-center p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer", isCollapsed ? "mx-auto" : "ml-auto")}
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
