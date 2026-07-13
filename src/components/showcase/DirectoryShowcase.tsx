"use client";

import React, { useState, useEffect } from "react";
import { Resource, Board, Medium, ClassLevel, Subject, Edition } from "@/types";
import { storageService } from "@/lib/storage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, ChevronRight, Download, Eye } from "lucide-react";

export const DirectoryShowcase: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [media, setMedia] = useState<Medium[]>([]);
  const [classes, setClasses] = useState<ClassLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);

  // Filter Selection
  const [selectedBoard, setSelectedBoard] = useState<string>("all");
  const [selectedMedium, setSelectedMedium] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedEdition, setSelectedEdition] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Detailed view of selected resource modal / expand drawer
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  useEffect(() => {
    // Only fetch enabled ones for user showcase
    setResources(storageService.getResources().filter((r) => r.enabled));
    setBoards(storageService.getBoards().filter((b) => b.enabled));
    setMedia(storageService.getMedia().filter((m) => m.enabled));
    setClasses(storageService.getClasses().filter((c) => c.enabled));
    setSubjects(storageService.getSubjects().filter((s) => s.enabled));
    setEditions(storageService.getEditions().filter((e) => e.enabled));
  }, []);

  // Helpers to resolve parameters
  const getBoardName = (id: string) => boards.find((b) => b.id === id)?.name || "Unknown Board";
  const getClassName = (id: string) => classes.find((c) => c.id === id)?.name || "Class Level";
  const getSubjectName = (id: string) => subjects.find((s) => s.id === id)?.name || "Subject";
  const getMediumName = (id: string) => media.find((m) => m.id === id)?.name || "English Medium";
  const getEditionName = (id: string) => editions.find((e) => e.id === id)?.year || "Current Edition";

  // Filter logic
  const filteredResources = resources.filter((res) => {
    if (selectedBoard !== "all" && res.boardId !== selectedBoard) return false;
    if (selectedMedium !== "all" && res.mediumId !== selectedMedium) return false;
    if (selectedClass !== "all" && res.classId !== selectedClass) return false;
    if (selectedSubject !== "all" && res.subjectId !== selectedSubject) return false;
    if (selectedEdition !== "all" && res.editionId !== selectedEdition) return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const subjectName = getSubjectName(res.subjectId).toLowerCase();
      const className = getClassName(res.classId).toLowerCase();
      const boardName = getBoardName(res.boardId).toLowerCase();
      return subjectName.includes(q) || className.includes(q) || boardName.includes(q);
    }

    return true;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters Hub */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by subject, class, grade or education board..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            variant="outline"
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 border-gray-200"
            onClick={() => {
              setSelectedBoard("all");
              setSelectedMedium("all");
              setSelectedClass("all");
              setSelectedSubject("all");
              setSelectedEdition("all");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </Button>
        </div>

        {/* Quick parameters filters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          {/* Boards */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Board</label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
            >
              <option value="all">All Boards</option>
              {boards.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
            >
              <option value="all">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Medium */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Medium</label>
            <select
              value={selectedMedium}
              onChange={(e) => setSelectedMedium(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
            >
              <option value="all">All Media</option>
              {media.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* Edition */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Edition</label>
            <select
              value={selectedEdition}
              onChange={(e) => setSelectedEdition(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
            >
              <option value="all">All Editions</option>
              {editions.map((e) => (
                <option key={e.id} value={e.id}>{e.year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource Cards Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredResources.map((res) => {
          const sName = getSubjectName(res.subjectId);
          const cName = getClassName(res.classId);
          const bName = getBoardName(res.boardId);
          const mName = getMediumName(res.mediumId);
          const eName = getEditionName(res.editionId);

          return (
            <Card key={res.id} className="group hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
              <div className="p-4 flex gap-4">
                <div className="relative shrink-0 w-24 h-32 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                  <img
                    src={res.thumbnail}
                    alt={`${sName} textbook`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {res.resourceType} Resource
                  </span>
                  <h3 className="font-extrabold text-base text-gray-800 dark:text-gray-100 truncate mt-1">
                    {sName}
                  </h3>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                    {cName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {bName}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {mName} | {eName}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50/50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                {res.resourceType === "full" ? (
                  <a
                    href={res.fullResourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF ({res.fullResourceSize || "Full Book"})
                  </a>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1.5 font-bold"
                    onClick={() => setActiveResource(res)}
                  >
                    <Eye className="w-3.5 h-3.5" /> View Chapters ({res.chapters.filter((ch) => ch.enabled).length})
                  </Button>
                )}
              </div>
            </Card>
          );
        })}

        {filteredResources.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">No Resources Found</h4>
            <p className="text-sm text-gray-500 max-w-md mx-auto mt-1">
              There are no resource materials matching your filter settings. Clear filters or adjust search fields above.
            </p>
          </div>
        )}
      </div>

      {/* Chapterwise Expandable Panel modal */}
      {activeResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] border border-gray-100 dark:border-gray-800">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between">
              <div className="flex gap-4">
                <img
                  src={activeResource.thumbnail}
                  alt="textbook"
                  className="w-16 h-20 object-cover rounded-lg border shadow-sm shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                    Chapterwise Directory
                  </span>
                  <h3 className="font-extrabold text-xl text-gray-900 dark:text-gray-100 mt-1">
                    {getSubjectName(activeResource.subjectId)} - {getClassName(activeResource.classId)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getBoardName(activeResource.boardId)} | {getMediumName(activeResource.mediumId)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveResource(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chapters list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Chapter List & Practice Exercises:</p>
              
              {activeResource.chapters.filter((ch) => ch.enabled).map((ch) => (
                <div key={ch.id} className="border border-gray-100 dark:border-gray-800/80 rounded-xl overflow-hidden">
                  
                  {/* Chapter primary row */}
                  <div className="bg-gray-50/50 dark:bg-gray-900/30 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-gray-100 dark:border-gray-800/60">
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mr-2">Chapter {ch.chapterNumber}</span>
                      <h4 className="inline font-bold text-sm text-gray-800 dark:text-gray-200">{ch.title}</h4>
                    </div>

                    {ch.hasChapterwiseFullResource && ch.chapterwiseFullResourceUrl && (
                      <a
                        href={ch.chapterwiseFullResourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Full Chapter ({ch.chapterwiseFullResourceSize || "PDF"})
                      </a>
                    )}
                  </div>

                  {/* Exercises subsection */}
                  <div className="p-4 bg-white dark:bg-gray-950/20">
                    {ch.exercises.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {ch.exercises.map((ex) => (
                          <div key={ex.id} className="flex justify-between items-center p-3 bg-gray-50/50 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800/50 rounded-lg text-xs">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{ex.title}</span>
                            <a
                              href={ex.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 shrink-0 ml-2"
                            >
                              Download <ChevronRight className="w-3 h-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No specific exercise-wise files uploaded for this chapter. Access the complete chapter directory PDF above.</p>
                    )}
                  </div>

                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <Button variant="secondary" onClick={() => setActiveResource(null)}>
                Close Directory
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
