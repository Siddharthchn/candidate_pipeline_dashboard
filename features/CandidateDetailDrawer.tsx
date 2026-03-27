"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Calendar, MapPin, Mail, Phone, Link as LinkIcon, Download, MoreVertical, Briefcase } from "lucide-react";
import { useDashboardStore } from "@/hooks/useStore";
import { cn } from "@/lib/utils";

export function CandidateDetailDrawer() {
  const { selectedCandidateId, selectCandidate, candidates, updateCandidateNotes } = useDashboardStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const candidate = candidates.find(c => c.id === selectedCandidateId);

  useEffect(() => {
    if (selectedCandidateId && drawerRef.current && overlayRef.current) {
      document.body.style.overflow = "hidden";
      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
        gsap.fromTo(drawerRef.current, { x: "100%" }, { x: "0%", duration: 0.3, ease: "power3.out" });
      });
      return () => {
        document.body.style.overflow = "auto";
        ctx.revert();
      };
    }
  }, [selectedCandidateId]);

  const handleClose = () => {
    if (drawerRef.current && overlayRef.current) {
      const ctx = gsap.context(() => {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
        gsap.to(drawerRef.current, { 
          x: "100%", 
          duration: 0.2, 
          ease: "power3.in",
          onComplete: () => selectCandidate(null)
        });
      });
      return () => ctx.revert();
    } else {
      selectCandidate(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!candidate) return null;

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 dark:bg-black/60 z-40"
        onClick={handleClose}
      />
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-[#111111] border-l border-zinc-200 dark:border-zinc-800 z-50 shadow-[0_0_40px_rgba(0,0,0,0.05)] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-zinc-900 dark:bg-white rounded flex items-center justify-center font-bold text-[9px] text-white dark:text-zinc-900">
              {candidate.name.charAt(0)}
            </div>
            <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">{candidate.name}</h2>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded transition-colors cursor-pointer">
              <MoreVertical className="w-4 h-4" />
            </button>
            <button 
              onClick={handleClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center text-center space-y-2 mb-8 mt-2">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{candidate.name}</h1>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center justify-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{candidate.role} · {candidate.company}</span>
            </p>
            
            <div className="flex gap-2 w-full mt-6">
               <button className="flex-1 bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold py-2 rounded text-[13px] transition-colors shadow-sm tracking-tight border border-transparent cursor-pointer">
                 Advance Candidate
               </button>
               <button className="flex-1 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 font-semibold py-2 text-zinc-700 dark:text-zinc-300 rounded text-[13px] transition-colors shadow-sm tracking-tight cursor-pointer">
                 Schedule Intervew
               </button>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2 uppercase tracking-wider">About</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Experience</span>
                  <span className="text-[13px] text-zinc-900 dark:text-zinc-200 font-medium">{candidate.experience} years</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 w-8">{candidate.score}%</span>
                    <div className="h-1.5 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden max-w-[60px]">
                      <div className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full" style={{ width: `${candidate.score}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Stage</span>
                  <span className="text-[13px] text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 self-start px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{candidate.stage}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-widest">Source</span>
                  <span className="text-[13px] text-zinc-900 dark:text-zinc-200 font-medium">Internal</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-[13px] text-zinc-600 dark:text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{candidate.name.split(" ")[0].toLowerCase()}@example.com</span>
                </li>
                <li className="flex items-center gap-3 text-[13px] text-zinc-600 dark:text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-[13px] text-zinc-600 dark:text-zinc-300">
                  <LinkIcon className="w-3.5 h-3.5 text-zinc-400" />
                  <a href="#" className="text-zinc-900 dark:text-zinc-100 hover:underline decoration-zinc-300 underline-offset-4">linkedin.com/in/{candidate.name.split(" ")[0].toLowerCase()}</a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2 uppercase tracking-wider">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 transition-colors text-zinc-800 dark:text-zinc-200 rounded text-[11px] font-semibold border border-zinc-200 dark:border-zinc-700 tabular-nums uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="pb-8">
              <h3 className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2 uppercase tracking-wider flex justify-between items-center">
                Notes
              </h3>
              <textarea
                value={candidate.notes}
                onChange={(e) => updateCandidateNotes(candidate.id, e.target.value)}
                placeholder="Add a note..."
                className="w-full h-32 p-3 text-[13px] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 dark:focus:ring-white/10 dark:focus:border-white resize-none transition-all placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100 leading-relaxed shadow-sm"
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
