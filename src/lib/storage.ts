import { Board, Medium, ClassLevel, Subject, Edition, Resource } from "@/types";
import { initialBoards, initialMedia, initialClasses, initialSubjects, initialEditions, initialResources } from "./data";

class StorageService {
  private isBrowser = typeof window !== "undefined";

  private get<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser) return defaultValue;
    const data = localStorage.getItem(key);
    if (!data) {
      this.set(key, defaultValue);
      return defaultValue;
    }
    try {
      return JSON.parse(data);
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Boards
  getBoards(): Board[] {
    return this.get<Board[]>("sp_boards", initialBoards);
  }
  saveBoards(boards: Board[]): void {
    this.set("sp_boards", boards);
  }

  // Media
  getMedia(): Medium[] {
    return this.get<Medium[]>("sp_media", initialMedia);
  }
  saveMedia(media: Medium[]): void {
    this.set("sp_media", media);
  }

  // Classes
  getClasses(): ClassLevel[] {
    return this.get<ClassLevel[]>("sp_classes", initialClasses);
  }
  saveClasses(classes: ClassLevel[]): void {
    this.set("sp_classes", classes);
  }

  // Subjects
  getSubjects(): Subject[] {
    return this.get<Subject[]>("sp_subjects", initialSubjects);
  }
  saveSubjects(subjects: Subject[]): void {
    this.set("sp_subjects", subjects);
  }

  // Editions
  getEditions(): Edition[] {
    return this.get<Edition[]>("sp_editions", initialEditions);
  }
  saveEditions(editions: Edition[]): void {
    this.set("sp_editions", editions);
  }

  // Resources
  getResources(): Resource[] {
    return this.get<Resource[]>("sp_resources", initialResources);
  }
  saveResources(resources: Resource[]): void {
    this.set("sp_resources", resources);
  }
}

export const storageService = new StorageService();
