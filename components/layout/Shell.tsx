import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden font-sans text-slate-900 dark:text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)] px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
