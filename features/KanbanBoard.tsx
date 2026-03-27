"use client";

import { useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/hooks/useStore";
import { Stage, stages } from "@/lib/mockData";
import { MoreHorizontal, Calendar, Star } from "lucide-react";

export function KanbanBoard() {
  const { candidates, stageFilter, searchQuery, moveCandidate, selectCandidate, experienceFilter, scoreFilter } = useDashboardStore();
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current) {
      const columns = boardRef.current.children;
      gsap.fromTo(
        columns,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div 
        ref={boardRef}
        className="flex space-x-6 overflow-x-auto pb-6 kanban-scroll min-h-[600px]"
      >
        {stages.map((stage) => {
          const columnCandidates = filteredCandidates.filter(c => c.stage === stage);
          
          return (
            <div key={stage} className="flex-shrink-0 w-80 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 flex flex-col border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">{stage}</h3>
                <span className="bg-white dark:bg-slate-800 text-xs font-medium py-1 px-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-slate-500 dark:text-slate-400">
                  {columnCandidates.length}
                </span>
              </div>

              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 min-h-[200px] transition-colors rounded-xl p-1 ${
                      snapshot.isDraggingOver ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    {columnCandidates.map((candidate, index) => (
                      <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 outline-none ${snapshot.isDragging ? "z-50" : ""}`}
                            style={{ ...provided.draggableProps.style }}
                            onClick={() => selectCandidate(candidate.id)}
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-3 items-center">
                                  <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full object-cover shrink-0 pointer-events-none" />
                                  <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{candidate.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.role}</p>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {candidate.skills.slice(0, 2).map(skill => (
                                  <span key={skill} className="px-2 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded text-[10px] font-medium font-mono">
                                    {skill}
                                  </span>
                                ))}
                                {candidate.skills.length > 2 && (
                                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded text-[10px] font-medium font-mono">
                                    +{candidate.skills.length - 2}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-1 text-slate-400 dark:text-slate-500 text-xs">
                                  <Calendar className="w-3 h-3" />
                                  <span>{candidate.lastActivity}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-amber-500 dark:text-amber-400 text-xs font-semibold">
                                  <Star className="w-3 h-3 fill-current" />
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
