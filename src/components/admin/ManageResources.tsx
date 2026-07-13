"use client";

import React, { useState, useEffect } from "react";
import { Resource, Board, Medium, ClassLevel, Subject, Edition, Chapter, Exercise } from "@/types";
import { storageService } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, CheckCircle, LayoutGrid } from "lucide-react";

export const ManageResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [media, setMedia] = useState<Medium[]>([]);
  const [classes, setClasses] = useState<ClassLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);

  // Selected filters for viewing/adding
  const [boardId, setBoardId] = useState("");
  const [mediumId, setMediumId] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [editionId, setEditionId] = useState("");

  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400");
  const [resourceType, setResourceType] = useState<"full" | "chapterwise">("full");

  // Full resource specific state
  const [fullResourceUrl, setFullResourceUrl] = useState("");
  const [fullResourceSize, setFullResourceSize] = useState("");

  // Chapterwise list
  const [chapters, setChapters] = useState<Chapter[]>([]);

  // State for building a single chapter inside the form
  const [currentChapterNum, setCurrentChapterNum] = useState<number>(1);
  const [currentChapterTitle, setCurrentChapterTitle] = useState("");
  const [hasChapterwiseFull, setHasChapterwiseFull] = useState(true);
  const [chapterwiseFullUrl, setChapterwiseFullUrl] = useState("");
  const [chapterwiseFullSize, setChapterwiseFullSize] = useState("");

  // Exercises belonging to current active-editing chapter in form
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [currentExerciseTitle, setCurrentExerciseTitle] = useState("");
  const [currentExerciseUrl, setCurrentExerciseUrl] = useState("");
  const [currentExerciseSize, setCurrentExerciseSize] = useState("");

  useEffect(() => {
    setResources(storageService.getResources());
    
    const b = storageService.getBoards().filter((x) => x.enabled);
    const m = storageService.getMedia().filter((x) => x.enabled);
    const c = storageService.getClasses().filter((x) => x.enabled);
    const s = storageService.getSubjects().filter((x) => x.enabled);
    const ed = storageService.getEditions().filter((x) => x.enabled);

    setBoards(b);
    setMedia(m);
    setClasses(c);
    setSubjects(s);
    setEditions(ed);

    if (b.length) setBoardId(b[0].id);
    if (m.length) setMediumId(m[0].id);
    if (c.length) setClassId(c[0].id);
    if (s.length) setSubjectId(s[0].id);
    if (ed.length) setEditionId(ed[0].id);
  }, []);

  // Helpers to resolve names
  const getBoardName = (id: string) => boards.find((b) => b.id === id)?.name || "Unknown Board";
  const getClassName = (id: string) => classes.find((c) => c.id === id)?.name || "Unknown Class";
  const getSubjectName = (id: string) => subjects.find((s) => s.id === id)?.name || "Unknown Subject";

  // Exercise adder to the active chapter in form
  const handleAddExerciseToCurrentChapter = () => {
    if (!currentExerciseTitle.trim()) return;
    const newEx: Exercise = {
      id: "ex_" + Date.now(),
      title: currentExerciseTitle,
      fileUrl: currentExerciseUrl || "https://example.com/mock-pdf.pdf",
      fileSize: currentExerciseSize || "1.2 MB",
    };
    setCurrentExercises([...currentExercises, newEx]);
    setCurrentExerciseTitle("");
    setCurrentExerciseUrl("");
    setCurrentExerciseSize("");
  };

  // Chapter adder to chapters list
  const handleAddChapterToResource = () => {
    if (!currentChapterTitle.trim()) return;
    const newChapter: Chapter = {
      id: "ch_" + Date.now(),
      chapterNumber: currentChapterNum,
      title: currentChapterTitle,
      enabled: true,
      hasChapterwiseFullResource: hasChapterwiseFull,
      chapterwiseFullResourceUrl: hasChapterwiseFull ? (chapterwiseFullUrl || "https://example.com/mock-pdf.pdf") : undefined,
      chapterwiseFullResourceSize: hasChapterwiseFull ? (chapterwiseFullSize || "4.5 MB") : undefined,
      exercises: currentExercises,
    };

    setChapters([...chapters, newChapter]);
    
    // Clear and increment chapter number
    setCurrentChapterNum(currentChapterNum + 1);
    setCurrentChapterTitle("");
    setHasChapterwiseFull(true);
    setChapterwiseFullUrl("");
    setChapterwiseFullSize("");
    setCurrentExercises([]);
  };

  // Submit full resource creation
  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardId || !mediumId || !classId || !subjectId || !editionId) {
      alert("Please ensure all parameters of the hierarchy are configured and active.");
      return;
    }

    const newResource: Resource = {
      id: "r_" + Date.now(),
      boardId,
      mediumId,
      classId,
      subjectId,
      editionId,
      enabled: true,
      thumbnail: thumbnail || "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400",
      resourceType,
      fullResourceUrl: resourceType === "full" ? (fullResourceUrl || "https://example.com/mock-pdf.pdf") : undefined,
      fullResourceSize: resourceType === "full" ? (fullResourceSize || "15 MB") : undefined,
      chapters: resourceType === "chapterwise" ? chapters : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newResource, ...resources];
    setResources(updated);
    storageService.saveResources(updated);

    // Reset fields
    setFullResourceUrl("");
    setFullResourceSize("");
    setChapters([]);
    setCurrentExercises([]);
    setCurrentChapterNum(1);
    setCurrentChapterTitle("");
    alert("Resource uploaded successfully!");
  };

  const toggleResource = (id: string) => {
    const updated = resources.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
    setResources(updated);
    storageService.saveResources(updated);
  };

  const deleteResource = (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      const updated = resources.filter((r) => r.id !== id);
      setResources(updated);
      storageService.saveResources(updated);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Upload & Manage Resources</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Combine educational parameters with materials. Upload full books or compile chapters with shared thumbnails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Creation Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Resource Directory</CardTitle>
              <CardDescription>Select hierarchy configuration and add assets</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateResource} className="space-y-6">
                
                {/* Hierarchy selection */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Select
                    label="Board"
                    value={boardId}
                    onChange={(e) => setBoardId(e.target.value)}
                    options={boards.map((b) => ({ value: b.id, label: b.name }))}
                  />
                  <Select
                    label="Medium"
                    value={mediumId}
                    onChange={(e) => setMediumId(e.target.value)}
                    options={media.map((m) => ({ value: m.id, label: m.name }))}
                  />
                  <Select
                    label="Class"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    options={classes.map((c) => ({ value: c.id, label: c.name }))}
                  />
                  <Select
                    label="Subject"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    options={subjects.map((s) => ({ value: s.id, label: s.name }))}
                  />
                  <Select
                    label="Edition"
                    value={editionId}
                    onChange={(e) => setEditionId(e.target.value)}
                    options={editions.map((ed) => ({ value: ed.id, label: ed.year }))}
                  />
                </div>

                {/* Shared Thumbnail */}
                <Input
                  label="Resource Thumbnail URL"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="Paste thumbnail image URL"
                />

                {/* Resource type toggle */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Resource Structure</label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={resourceType === "full"}
                        onChange={() => setResourceType("full")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300">Full Single Resource (e.g. Complete Book PDF)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={resourceType === "chapterwise"}
                        onChange={() => setResourceType("chapterwise")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300">Chapterwise resource files / Exercises</span>
                    </label>
                  </div>
                </div>

                {/* Full Resource inputs */}
                {resourceType === "full" && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Full Book File Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Download File URL"
                        value={fullResourceUrl}
                        onChange={(e) => setFullResourceUrl(e.target.value)}
                        placeholder="https://example.com/maths-full.pdf"
                      />
                      <Input
                        label="File Size"
                        value={fullResourceSize}
                        onChange={(e) => setFullResourceSize(e.target.value)}
                        placeholder="e.g. 15.2 MB"
                      />
                    </div>
                  </div>
                )}

                {/* Chapterwise builder */}
                {resourceType === "chapterwise" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Add Chapters to this book</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full dark:bg-blue-900/40 dark:text-blue-300">
                          Chapter {currentChapterNum} Builder
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <Input
                              label="Chapter Title"
                              value={currentChapterTitle}
                              onChange={(e) => setCurrentChapterTitle(e.target.value)}
                              placeholder="e.g. Matrices & Determinants"
                            />
                          </div>
                          <div>
                            <Input
                              label="Chapter Number"
                              type="number"
                              value={currentChapterNum}
                              onChange={(e) => setCurrentChapterNum(Number(e.target.value))}
                            />
                          </div>
                        </div>

                        {/* Chapterwise full resource options */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-3 space-y-3">
                          <Switch
                            label="Include Chapterwise Full Book-Chapter resource (e.g. Complete chapter pdf)?"
                            checked={hasChapterwiseFull}
                            onChange={(checked) => setHasChapterwiseFull(checked)}
                          />
                          {hasChapterwiseFull && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                              <Input
                                label="Chapter Book PDF URL"
                                value={chapterwiseFullUrl}
                                onChange={(e) => setChapterwiseFullUrl(e.target.value)}
                                placeholder="https://example.com/ch1-full.pdf"
                              />
                              <Input
                                label="Chapter PDF Size"
                                value={chapterwiseFullSize}
                                onChange={(e) => setChapterwiseFullSize(e.target.value)}
                                placeholder="e.g. 4.1 MB"
                              />
                            </div>
                          )}
                        </div>

                        {/* Exercises inside this chapter */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-3 space-y-3">
                          <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300">Add Chapter Exercises (Optional)</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <Input
                              placeholder="Exercise (e.g. Exercise 1.1)"
                              value={currentExerciseTitle}
                              onChange={(e) => setCurrentExerciseTitle(e.target.value)}
                            />
                            <Input
                              placeholder="Exercise File URL"
                              value={currentExerciseUrl}
                              onChange={(e) => setCurrentExerciseUrl(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Input
                                placeholder="Size (e.g. 1.2 MB)"
                                value={currentExerciseSize}
                                onChange={(e) => setCurrentExerciseSize(e.target.value)}
                              />
                              <Button type="button" variant="secondary" onClick={handleAddExerciseToCurrentChapter} className="shrink-0">
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Render current exercises buffer list */}
                          {currentExercises.length > 0 && (
                            <div className="bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-200 dark:border-gray-800 space-y-1">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Exercises in this Chapter:</p>
                              {currentExercises.map((ex, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300">
                                  <span>{ex.title} ({ex.fileSize || "Shared thumbnail size"})</span>
                                  <button
                                    type="button"
                                    onClick={() => setCurrentExercises(currentExercises.filter((_, i) => i !== idx))}
                                    className="text-red-500 hover:text-red-700 font-semibold"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleAddChapterToResource}>
                          <CheckCircle className="w-4 h-4" /> Save and Add This Chapter
                        </Button>
                      </div>
                    </div>

                    {/* Render Chapters saved so far */}
                    {chapters.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Chapters added to this resource:</p>
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                          {chapters.map((ch, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-lg text-sm">
                              <div>
                                <span className="font-semibold text-blue-800 dark:text-blue-300">Chapter {ch.chapterNumber}: </span>
                                <span className="text-gray-700 dark:text-gray-200">{ch.title}</span>
                                <div className="text-xs text-gray-500 mt-1">
                                  {ch.hasChapterwiseFullResource ? "Includes full chapter file" : "No full chapter file"} | {ch.exercises.length} Exercise(s)
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setChapters(chapters.filter((_, i) => i !== idx))}
                                className="text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <Button type="submit" variant="primary" className="w-full text-base font-bold">
                  Publish Resource Book
                </Button>

              </form>
            </CardContent>
          </Card>
        </div>

        {/* Existing Resources List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-blue-600" /> Active Directories ({resources.length})
          </h3>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
            {resources.map((res) => (
              <Card key={res.id} className={!res.enabled ? "opacity-60 bg-gray-50/50" : ""}>
                <CardContent className="p-4 flex gap-4">
                  <img
                    src={res.thumbnail}
                    alt="Resource cover"
                    className="w-16 h-20 rounded-md object-cover border border-gray-200 dark:border-gray-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 dark:bg-blue-950 dark:text-blue-400 px-2 py-0.5 rounded-full">
                        {res.resourceType}
                      </span>
                      <div className="flex items-center gap-2">
                        <Switch checked={res.enabled} onChange={() => toggleResource(res.id)} />
                        <button type="button" onClick={() => deleteResource(res.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                      {getSubjectName(res.subjectId)} - {getClassName(res.classId)}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getBoardName(res.boardId)}
                    </p>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2">
                      {res.resourceType === "full" ? (
                        <span>Full Book Resource size: {res.fullResourceSize}</span>
                      ) : (
                        <span>{res.chapters.length} Chapters structured</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
