import { Metadata } from "next";
import HomeClient from "./HomeClient";

// Optimized Dynamic Metadata for Best SEO Rank
export const metadata: Metadata = {
  title: "SmartParho - Premium Educational Books & Directory Resources",
  description: "Access premium school boards, subject materials, class textbooks, medium editions, chapterwise solutions and practices. All dynamic hierarchies optimized for students on smartparho.com.",
  keywords: "smartparho, educational boards, high responsiveness, textbook, solved chapters, fbise, math syllabus, pakistan education directories, online exam practice",
  openGraph: {
    title: "SmartParho - Educational Textbook Directory",
    description: "Browse classes, subjects, mediums and editions with shared chapter thumbnails and practice exercise sheets. Fully responsive MERN experience.",
    url: "https://smartparho.com",
    siteName: "SmartParho",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "SmartParho Textbook Catalog",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartParho - Educational Directory Showcase",
    description: "Modern directory for textbook boards, subject media, editions and exercise downloads.",
    images: ["https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200"],
  },
};

export default function Home() {
  return <HomeClient />;
}
