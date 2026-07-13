import { Board, Medium, ClassLevel, Subject, Edition, Resource } from "@/types";

// Initial seed data for Board, Medium, Class, Subject, Edition
export const initialBoards: Board[] = [
  { id: "b1", name: "Punjab Board (BISE)", code: "PUNJAB", enabled: true },
  { id: "b2", name: "Federal Board (FBISE)", code: "FEDERAL", enabled: true },
  { id: "b3", name: "Sindh Board (BIEK)", code: "SINDH", enabled: true },
  { id: "b4", name: "KPK Board (BISEP)", code: "KPK", enabled: true },
  { id: "b5", name: "Balochistan Board", code: "BALOCHISTAN", enabled: false }
];

export const initialMedia: Medium[] = [
  { id: "m1", name: "English Medium", enabled: true },
  { id: "m2", name: "Urdu Medium", enabled: true },
  { id: "m3", name: "Hindi Medium", enabled: false }
];

export const initialClasses: ClassLevel[] = [
  { id: "c1", name: "Class 9th", enabled: true },
  { id: "c2", name: "Class 10th", enabled: true },
  { id: "c3", name: "Class 11th (1st Year)", enabled: true },
  { id: "c4", name: "Class 12th (2nd Year)", enabled: true },
  { id: "c5", name: "O Levels", enabled: false }
];

export const initialSubjects: Subject[] = [
  { id: "s1", name: "Physics", enabled: true },
  { id: "s2", name: "Chemistry", enabled: true },
  { id: "s3", name: "Mathematics", enabled: true },
  { id: "s4", name: "Biology", enabled: true },
  { id: "s5", name: "Computer Science", enabled: true },
  { id: "s6", name: "English Literature", enabled: false }
];

export const initialEditions: Edition[] = [
  { id: "e1", year: "2025 - 2026", enabled: true },
  { id: "e2", year: "2024 - 2025", enabled: true },
  { id: "e3", year: "2023 - 2024", enabled: true },
  { id: "e4", year: "2022 - 2023", enabled: false }
];

export const initialResources: Resource[] = [
  {
    id: "r1",
    boardId: "b1", // Punjab Board
    mediumId: "m1", // English Medium
    classId: "c1", // Class 9th
    subjectId: "s3", // Mathematics
    editionId: "e1", // 2025 - 2026
    enabled: true,
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400",
    resourceType: "chapterwise",
    chapters: [
      {
        id: "ch1",
        chapterNumber: 1,
        title: "Matrices and Determinants",
        enabled: true,
        hasChapterwiseFullResource: true,
        chapterwiseFullResourceUrl: "https://example.com/downloads/punjab-9th-maths-ch1.pdf",
        chapterwiseFullResourceSize: "4.2 MB",
        exercises: [
          { id: "ex1_1", title: "Exercise 1.1", fileUrl: "https://example.com/downloads/punjab-9th-maths-ex1-1.pdf", fileSize: "1.1 MB" },
          { id: "ex1_2", title: "Exercise 1.2", fileUrl: "https://example.com/downloads/punjab-9th-maths-ex1-2.pdf", fileSize: "1.5 MB" },
          { id: "ex1_3", title: "Exercise 1.3", fileUrl: "https://example.com/downloads/punjab-9th-maths-ex1-3.pdf", fileSize: "1.6 MB" }
        ]
      },
      {
        id: "ch2",
        chapterNumber: 2,
        title: "Real and Complex Numbers",
        enabled: true,
        hasChapterwiseFullResource: true,
        chapterwiseFullResourceUrl: "https://example.com/downloads/punjab-9th-maths-ch2.pdf",
        chapterwiseFullResourceSize: "5.1 MB",
        exercises: [
          { id: "ex2_1", title: "Exercise 2.1", fileUrl: "https://example.com/downloads/punjab-9th-maths-ex2-1.pdf", fileSize: "1.2 MB" },
          { id: "ex2_2", title: "Exercise 2.2", fileUrl: "https://example.com/downloads/punjab-9th-maths-ex2-2.pdf", fileSize: "0.9 MB" }
        ]
      }
    ],
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-01-15T08:00:00.000Z"
  },
  {
    id: "r2",
    boardId: "b2", // Federal Board
    mediumId: "m1", // English Medium
    classId: "c2", // Class 10th
    subjectId: "s1", // Physics
    editionId: "e1", // 2025 - 2026
    enabled: true,
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
    resourceType: "full",
    fullResourceUrl: "https://example.com/downloads/federal-10th-physics-full.pdf",
    fullResourceSize: "18.5 MB",
    chapters: [],
    createdAt: "2026-02-10T10:30:00.000Z",
    updatedAt: "2026-02-10T10:30:00.000Z"
  }
];
