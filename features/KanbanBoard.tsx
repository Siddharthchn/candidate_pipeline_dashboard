"use client";

import { useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/hooks/useStore";
import { Stage, stages } from "@/lib/mockData";
import { MoreHorizontal, Calendar, Zap } from "lucide-react";

export function KanbanBoard() {
  const { candidates, stageFilter, searchQuery, moveCandidate, selectCandidate, experienceFilter, scoreFilter } = useDashboardStore();
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current) {
      const columns = boardRef.current.children;
      gsap.fromTo(
        columns,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    moveCandidate(draggableId, destination.droppableId as Stage);
  };

  const filteredCandidates = candidates.filter(c => {
    const matchesStage = stageFilter === "All" || c.stage === stageFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExperience = c.experience >= experienceFilter[0] && c.experience <= experienceFilter[1];
    const matchesScore = c.score >= scoreFilter;
    return matchesStage && matchesSearch && matchesExperience && matchesScore;
  });

  const displayStages = [...stages].sort((a, b) => {
    // If a specific stage is clicked, bring it to the absolute front
    if (stageFilter !== "All") {
      if (a === stageFilter) return -1;
      if (b === stageFilter) return 1;
    }
    
    // If searching, bring columns with results to the front
    if (searchQuery.trim().length > 0) {
      const aHasMatches = filteredCandidates.some(c => c.stage === a);
      const bHasMatches = filteredCandidates.some(c => c.stage === b);
      
      if (aHasMatches && !bHasMatches) return -1;
      if (!aHasMatches && bHasMatches) return 1;
    }
    
    return 0; // keep relative order otherwise
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div 
        ref={boardRef}
        className="flex gap-4 overflow-x-auto pb-4 kanban-scroll min-h-[600px]"
      >
        {displayStages.map((stage) => {
          const columnCandidates = filteredCandidates.filter(c => c.stage === stage);
          
          return (
            <div key={stage} className="flex-shrink-0 w-72 bg-zinc-50 dark:bg-[#111111] rounded border border-zinc-200/60 dark:border-zinc-800 flex flex-col pt-3 pb-1 px-2 h-max">
              <div className="flex items-center justify-between mb-3 px-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    stage === 'Applied' ? 'bg-zinc-400' :
                    stage === 'Shortlisted' ? 'bg-blue-400' :
                    stage === 'Interview' ? 'bg-purple-400' :
                    stage === 'Offered' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[13px] tracking-tight">{stage}</h3>
                </div>
                <span className="text-[11px] font-mono font-medium text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  {columnCandidates.length}
                </span>
              </div>

              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 min-h-[50px] transition-colors pb-2 px-1 ${
                      snapshot.isDraggingOver ? "bg-zinc-100 dark:bg-zinc-900 rounded" : ""
                    }`}
                  >
                    {columnCandidates.map((candidate, index) => (
                      <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2.5 outline-none`}
                            style={{ ...provided.draggableProps.style }}
                            onClick={() => selectCandidate(candidate.id)}
                          >
                            <motion.div
                              whileHover={{ y: -1 }}
                              className={`bg-white dark:bg-[#161616] p-3 rounded shadow-[0_1px_3px_rgb(0,0,0,0.06)] border border-zinc-200 dark:border-zinc-800 cursor-grab active:cursor-grabbing hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors ${snapshot.isDragging ? "shadow-xl border-blue-500 dark:border-blue-500" : ""}`}
                            >
                              <div className="flex justify-between items-start mb-2.5">
                                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[13px] leading-tight flex-1">{candidate.name}</h4>
                                <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 cursor-pointer">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mb-3 leading-snug">{candidate.role}</p>

                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {candidate.skills.slice(0, 3).map(skill => (
                                  <span key={skill} className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded text-[10px] font-medium font-mono border border-zinc-200/50 dark:border-zinc-700/50">
                                    {skill}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-medium">
                                  <Calendar className="w-3 h-3 stroke-[2.5]" />
                                  <span>{candidate.lastActivity.replace(" ago", "")}</span>
                                </div>
                                <div className="flex items-center gap-1 text-zinc-900 dark:text-zinc-100 text-[11px] font-bold">
                                  <Zap className="w-3 h-3 fill-amber-400 text-amber-500" />
                                  <span>{candidate.score}</span>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
