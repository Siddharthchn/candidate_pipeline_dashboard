"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Calendar, MapPin, Mail, Phone, Link as LinkIcon, Download, MoreVertical, Briefcase } from "lucide-react";
import { useDashboardStore } from "@/hooks/useStore";

export function CandidateDetailDrawer() {
  const { selectedCandidateId, selectCandidate, candidates, updateCandidateNotes } = useDashboardStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const candidate = candidates.find(c => c.id === selectedCandidateId);

  useEffect(() => {
    if (selectedCandidateId && drawerRef.current && overlayRef.current) {
      document.body.style.overflow = "hidden";
      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(drawerRef.current, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" });
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
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(drawerRef.current, { 
          x: "100%", 
          duration: 0.3, 
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
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={handleClose}
      />
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-50 shadow-2xl overflow-y-auto"
      >
        <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Candidate Profile</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            <button 
              onClick={handleClose}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center text-center space-y-3 mb-8">
            <img src={candidate.avatar} alt={candidate.name} className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">{candidate.name}</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>{candidate.role} at {candidate.company}</span>
              </p>
            </div>
            
            <div className="flex gap-2 w-full mt-4">
               <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl text-sm transition-colors shadow-sm shadow-blue-600/20">
                 Move to Next Stage
               </button>
               <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 font-medium py-2 text-slate-700 dark:text-slate-300 rounded-xl text-sm transition-colors shadow-sm">
                 Schedule Interview
               </button>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">About</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Experience</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200">{candidate.experience} years</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Match Score</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-amber-600 dark:text-amber-500">{candidate.score}%</span>
                    <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${candidate.score}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Current Stage</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{candidate.stage}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sourced</span>
                  <span className="text-sm text-slate-800 dark:text-slate-200">Agency</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{candidate.name.split(" ")[0].toLowerCase()}@example.com</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300">
                  <LinkIcon className="w-4 h-4 text-slate-400" />
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">linkedin.com/in/{candidate.name.split(" ")[0].toLowerCase()}</a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2 flex justify-between items-center">
                Notes
                <button className="text-xs text-blue-600 hover:underline">Edit</button>
              </h3>
              <textarea
                value={candidate.notes}
                onChange={(e) => updateCandidateNotes(candidate.id, e.target.value)}
                placeholder="Add a note..."
                className="w-full h-32 p-3 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all placeholder:text-slate-400 text-slate-700 dark:text-slate-300"
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
