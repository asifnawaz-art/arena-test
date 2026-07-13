export interface Board {
  id: string;
  name: string;
  code: string;
  enabled: boolean;
}

export interface Medium {
  id: string;
  name: string; // e.g. English, Urdu, Hindi
  enabled: boolean;
}

export interface ClassLevel {
  id: string;
  name: string; // e.g. Class 9, Class 10, FSc Part 1
  enabled: boolean;
}

export interface Subject {
  id: string;
  name: string; // e.g. Physics, Chemistry, Mathematics
  enabled: boolean;
}

export interface Edition {
  id: string;
  year: string; // e.g. 2024-25, 2023
  enabled: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  fileUrl: string;
  fileSize?: string;
  downloadCount: number;
}

export interface Exercise {
  id: string;
  title: string; // e.g. Exercise 1.1
  fileUrl: string;
  fileSize?: string;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  enabled: boolean;
  
  // Chapterwise full resource info
  hasChapterwiseFullResource: boolean;
  chapterwiseFullResourceUrl?: string;
  chapterwiseFullResourceSize?: string;
  
  // Exercises inside the chapter
  exercises: Exercise[];
}

export interface Resource {
  id: string;
  boardId: string;
  mediumId: string;
  classId: string;
  subjectId: string;
  editionId: string;
  
  enabled: boolean;
  thumbnail: string; // Shared/single thumbnail for this resource
  
  resourceType: 'full' | 'chapterwise';
  
  // If 'full'
  fullResourceUrl?: string;
  fullResourceSize?: string;
  
  // If 'chapterwise'
  chapters: Chapter[];
  
  createdAt: string;
  updatedAt: string;
}
