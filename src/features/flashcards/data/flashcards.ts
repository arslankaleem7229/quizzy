export interface Flashcard {
  id: number;
  title: string;
  image: string;
  color: string;
}

export const flashcards: Flashcard[] = [
  {
    id: 1,
    title: "Learn",
    image: "/mockups/learn.png",
    color: "bg-[#98e3ff]",
  },
  {
    id: 2,
    title: "Study Guides",
    image: "/mockups/study-guides.png",
    color: "bg-[#EEAAFF]",
  },
  {
    id: 3,
    title: "Flashcards",
    image: "/mockups/flashcards.png",
    color: "bg-[#423ED8]",
  },
  {
    id: 4,
    title: "Practice Tests",
    image: "/mockups/practice-tests.png",
    color: "bg-[#FFC38C]",
  },
  {
    id: 5,
    title: "Expert Solutions",
    image: "/mockups/expert-solutions.png",
    color: "bg-[#98F1D1]",
  },
];
