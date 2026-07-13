"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { DirectoryShowcase } from "@/components/showcase/DirectoryShowcase";
import { ManageHierarchy } from "@/components/admin/ManageHierarchy";
import { ManageResources } from "@/components/admin/ManageResources";
import { Button } from "@/components/ui/button";
import { Settings, BookOpen, GraduationCap, Zap, Sparkles } from "lucide-react";

export default function HomeClient() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminTab, setAdminTab] = useState<"hierarchy" | "resources">("hierarchy");

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-950/20 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      <Header />

      {/* Hero Banner Area */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 py-16 md:py-24">
        
        {/* Absolute Background Accent Elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-blue-100/40 dark:bg-blue-900/10 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 rounded-full bg-emerald-100/30 dark:bg-emerald-900/10 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 bg-blue-50 dark:bg-blue-950 dark:text-blue-400 px-3.5 py-1.5 rounded-full border border-blue-100 dark:border-blue-900/50 uppercase tracking-widest mx-auto animate-bounce">
            <Sparkles className="w-3.5 h-3.5" /> High-Responsiveness Educational Matrix
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none max-w-4xl mx-auto">
            Dynamic Textbook Directories for Boards & Academics
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Discover chapter-wise resources, practice exams, and comprehensive course materials organized by standard educational frameworks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              variant={!isAdminMode ? "primary" : "outline"}
              className="text-sm font-extrabold px-6 py-3 flex items-center gap-2"
              onClick={() => setIsAdminMode(false)}
            >
              <BookOpen className="w-4 h-4" /> Explore Catalog
            </Button>
            <Button
              variant={isAdminMode ? "primary" : "outline"}
              className="text-sm font-extrabold px-6 py-3 flex items-center gap-2"
              onClick={() => setIsAdminMode(true)}
            >
              <Settings className="w-4 h-4" /> Administrative Console
            </Button>
          </div>
        </div>
      </section>

      {/* Main Contents */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {!isAdminMode ? (
          /* User Showcase Catalog Mode */
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-7 h-7 text-blue-600" /> Syllabus Catalogs
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Filter by board, instructions, class level and academic subjects.
                </p>
              </div>
              <div className="flex items-center gap-3 self-start md:self-auto text-xs text-gray-400 font-bold">
                <span className="flex items-center gap-1 text-emerald-600">
                  <Zap className="w-4 h-4 fill-emerald-600" /> SEO-Optimized
                </span>
                <span>•</span>
                <span>MERN Architecture</span>
              </div>
            </div>

            <DirectoryShowcase />
          </div>
        ) : (
          /* Administrative Workspace Mode */
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-5 gap-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                  <Settings className="w-7 h-7 text-blue-600" /> Administrative Console
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Real-time database updates for dynamic parameters and directory resources.
                </p>
              </div>

              {/* Admin subtabs navigation */}
              <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl space-x-1 shrink-0 self-start sm:self-auto">
                <button
                  onClick={() => setAdminTab("hierarchy")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                    adminTab === "hierarchy"
                      ? "bg-white dark:bg-gray-950 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
                  }`}
                >
                  Configure Hierarchy
                </button>
                <button
                  onClick={() => setAdminTab("resources")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                    adminTab === "resources"
                      ? "bg-white dark:bg-gray-950 text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
                  }`}
                >
                  Manage Directories & Books
                </button>
              </div>
            </div>

            {adminTab === "hierarchy" ? <ManageHierarchy /> : <ManageResources />}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
