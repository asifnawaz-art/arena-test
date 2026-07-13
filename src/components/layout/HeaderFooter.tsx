import React from "react";
import { GraduationCap, Award, Heart } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2.5">
          <div className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white">
              Smart<span className="text-blue-600">Parho</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 block -mt-1 uppercase tracking-wider">
              Educational Directory
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600 dark:text-gray-300">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Syllabi</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Model Papers</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Academics</a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 px-3 py-1.5 rounded-full">
            <Award className="w-3.5 h-3.5" /> High-Performance MERN Stack
          </span>
        </div>

      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-gray-900 dark:text-white">SmartParho</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Empowering students and educators with curated textbooks, academic guides, and solved exercise directories. Fully dynamic hierarchy parameters.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Academic Boards</h4>
            <ul className="space-y-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Federal Board (FBISE)</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Punjab Board (BISE)</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Sindh Board</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">KPK Board</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Resources</h4>
            <ul className="space-y-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Chapterwise Solved Books</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Syllabus Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Explanatory Exercises</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Editions & Archives</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">SEO Hub</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Optimized with Server-Side-Rendering and dynamic metadata tags for enhanced indexing on google rankings.
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Pakistan & Abroad
            </span>
          </div>

        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-semibold gap-4">
          <p>© {new Date().getFullYear()} smartparho.com. All academic rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Use</a>
            <a href="#" className="hover:text-blue-600">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
