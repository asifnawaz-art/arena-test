"use client";

import React, { useState, useEffect } from "react";
import { Board, Medium, ClassLevel, Subject, Edition } from "@/types";
import { storageService } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

export const ManageHierarchy: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [media, setMedia] = useState<Medium[]>([]);
  const [classes, setClasses] = useState<ClassLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);

  // Form states
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardCode, setNewBoardCode] = useState("");
  const [newMediumName, setNewMediumName] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newEditionYear, setNewEditionYear] = useState("");

  // Load everything on mount
  useEffect(() => {
    setBoards(storageService.getBoards());
    setMedia(storageService.getMedia());
    setClasses(storageService.getClasses());
    setSubjects(storageService.getSubjects());
    setEditions(storageService.getEditions());
  }, []);

  // Board actions
  const handleAddBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim() || !newBoardCode.trim()) return;
    const item: Board = {
      id: "b_" + Date.now(),
      name: newBoardName,
      code: newBoardCode.toUpperCase(),
      enabled: true,
    };
    const updated = [...boards, item];
    setBoards(updated);
    storageService.saveBoards(updated);
    setNewBoardName("");
    setNewBoardCode("");
  };

  const toggleBoard = (id: string) => {
    const updated = boards.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b));
    setBoards(updated);
    storageService.saveBoards(updated);
  };

  const deleteBoard = (id: string) => {
    const updated = boards.filter((b) => b.id !== id);
    setBoards(updated);
    storageService.saveBoards(updated);
  };

  // Medium actions
  const handleAddMedium = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediumName.trim()) return;
    const item: Medium = {
      id: "m_" + Date.now(),
      name: newMediumName,
      enabled: true,
    };
    const updated = [...media, item];
    setMedia(updated);
    storageService.saveMedia(updated);
    setNewMediumName("");
  };

  const toggleMedium = (id: string) => {
    const updated = media.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m));
    setMedia(updated);
    storageService.saveMedia(updated);
  };

  const deleteMedium = (id: string) => {
    const updated = media.filter((m) => m.id !== id);
    setMedia(updated);
    storageService.saveMedia(updated);
  };

  // Class actions
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    const item: ClassLevel = {
      id: "c_" + Date.now(),
      name: newClassName,
      enabled: true,
    };
    const updated = [...classes, item];
    setClasses(updated);
    storageService.saveClasses(updated);
    setNewClassName("");
  };

  const toggleClass = (id: string) => {
    const updated = classes.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c));
    setClasses(updated);
    storageService.saveClasses(updated);
  };

  const deleteClass = (id: string) => {
    const updated = classes.filter((c) => c.id !== id);
    setClasses(updated);
    storageService.saveClasses(updated);
  };

  // Subject actions
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const item: Subject = {
      id: "s_" + Date.now(),
      name: newSubjectName,
      enabled: true,
    };
    const updated = [...subjects, item];
    setSubjects(updated);
    storageService.saveSubjects(updated);
    setNewSubjectName("");
  };

  const toggleSubject = (id: string) => {
    const updated = subjects.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSubjects(updated);
    storageService.saveSubjects(updated);
  };

  const deleteSubject = (id: string) => {
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    storageService.saveSubjects(updated);
  };

  // Edition actions
  const handleAddEdition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEditionYear.trim()) return;
    const item: Edition = {
      id: "e_" + Date.now(),
      year: newEditionYear,
      enabled: true,
    };
    const updated = [...editions, item];
    setEditions(updated);
    storageService.saveEditions(updated);
    setNewEditionYear("");
  };

  const toggleEdition = (id: string) => {
    const updated = editions.map((ed) => (ed.id === id ? { ...ed, enabled: !ed.enabled } : ed));
    setEditions(updated);
    storageService.saveEditions(updated);
  };

  const deleteEdition = (id: string) => {
    const updated = editions.filter((ed) => ed.id !== id);
    setEditions(updated);
    storageService.saveEditions(updated);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Hierarchy & Parameter Configuration</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage Boards, Mediums, Classes, Subjects, and Editions. Toggle statuses to enable or disable academic options instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Boards Card */}
        <Card>
          <CardHeader>
            <CardTitle>Boards / Jurisdictions</CardTitle>
            <CardDescription>Configure education boards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddBoard} className="space-y-3">
              <Input
                placeholder="Board Name (e.g. Federal Board)"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                size={30}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Code (e.g. FBISE)"
                  value={newBoardCode}
                  onChange={(e) => setNewBoardCode(e.target.value)}
                />
                <Button type="submit" variant="primary" className="shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </form>
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
              {boards.map((b) => (
                <div key={b.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{b.code}</span>
                    <span className="text-gray-500 ml-1.5">({b.name})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={b.enabled} onChange={() => toggleBoard(b.id)} />
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 p-1.5" onClick={() => deleteBoard(b.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medium Card */}
        <Card>
          <CardHeader>
            <CardTitle>Mediums of Instruction</CardTitle>
            <CardDescription>Configure language mediums</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddMedium} className="flex gap-2">
              <Input
                placeholder="Medium (e.g. English Medium)"
                value={newMediumName}
                onChange={(e) => setNewMediumName(e.target.value)}
              />
              <Button type="submit" variant="primary" className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </form>
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
              {media.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{m.name}</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={m.enabled} onChange={() => toggleMedium(m.id)} />
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 p-1.5" onClick={() => deleteMedium(m.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Classes Card */}
        <Card>
          <CardHeader>
            <CardTitle>Classes / Grades</CardTitle>
            <CardDescription>Configure academic classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddClass} className="flex gap-2">
              <Input
                placeholder="Class (e.g. Class 9th)"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
              />
              <Button type="submit" variant="primary" className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </form>
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
              {classes.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={c.enabled} onChange={() => toggleClass(c.id)} />
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 p-1.5" onClick={() => deleteClass(c.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subjects Card */}
        <Card>
          <CardHeader>
            <CardTitle>Subjects</CardTitle>
            <CardDescription>Configure textbook subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddSubject} className="flex gap-2">
              <Input
                placeholder="Subject (e.g. Physics)"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />
              <Button type="submit" variant="primary" className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </form>
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
              {subjects.map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={s.enabled} onChange={() => toggleSubject(s.id)} />
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 p-1.5" onClick={() => deleteSubject(s.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Editions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Editions</CardTitle>
            <CardDescription>Configure book release years</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddEdition} className="flex gap-2">
              <Input
                placeholder="Edition (e.g. 2025 - 2026)"
                value={newEditionYear}
                onChange={(e) => setNewEditionYear(e.target.value)}
              />
              <Button type="submit" variant="primary" className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </form>
            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
              {editions.map((ed) => (
                <div key={ed.id} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{ed.year}</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={ed.enabled} onChange={() => toggleEdition(ed.id)} />
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 p-1.5" onClick={() => deleteEdition(ed.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
