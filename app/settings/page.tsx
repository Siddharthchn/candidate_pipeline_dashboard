"use client";

import { User, Bell, Shield, Paintbrush } from "lucide-react";

export default function SettingsPage() {
  const sections = [
    { title: "Profile", icon: User, description: "Manage your personal details and avatar." },
    { title: "Notifications", icon: Bell, description: "Configure how you receive alerts." },
    { title: "Security", icon: Shield, description: "Update passwords and authentication." },
    { title: "Appearance", icon: Paintbrush, description: "Customize the dashboard theme." },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">Settings</h1>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400">Manage your account configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          {sections.map((sec, i) => (
            <button key={i} className={`w-full flex items-center gap-2 p-2 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${i === 0 ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-200"}`}>
              <sec.icon className="w-4 h-4" /> {sec.title}
            </button>
          ))}
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-[#111111] rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Profile Information</h3>
            
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?u=recruiter1" alt="Avatar" className="w-16 h-16 rounded-full border border-zinc-200 dark:border-zinc-700" />
                <button className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-md text-[12px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                  Change Avatar
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">First Name</label>
                  <input type="text" defaultValue="Sarah" className="w-full p-2 text-[13px] bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">Last Name</label>
                  <input type="text" defaultValue="Connor" className="w-full p-2 text-[13px] bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-medium" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
                  <input type="email" defaultValue="sarah.c@hiresync.com" className="w-full p-2 text-[13px] bg-white dark:bg-[#1A1A1A] border border-zinc-200 dark:border-zinc-800 text-zinc-400 rounded-md cursor-not-allowed" disabled />
                </div>
              </div>
              
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-md text-[13px] font-bold shadow-sm active:scale-95 transition-all cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
