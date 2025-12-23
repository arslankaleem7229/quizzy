type FlashcardSet = {
  id: string;
  title: string;
  terms: number;
  rating: number;
  reviews: number;
  author: string;
  authorRole: string;
  studentsToday?: number;
  lastStudied?: string;
};

export const flashcardSets: FlashcardSet[] = [
  {
    id: "set-1",
    title: "At school 3A - School subject (Reasoning)",
    terms: 15,
    rating: 4.2,
    reviews: 19,
    author: "Muhammad_Asad",
    authorRole: "Teacher",
    studentsToday: 13,
  },
  {
    id: "set-2",
    title: "Amanya’r eryoka-characters and places",
    terms: 18,
    rating: 4.5,
    reviews: 12,
    author: "oraltradweek",
    authorRole: "Teacher",
    studentsToday: 4,
  },
  {
    id: "set-3",
    title: "The 99 Names of Allah",
    terms: 99,
    rating: 4.8,
    reviews: 63,
    author: "fatimajaberr7",
    authorRole: "Teacher",
    lastStudied: "18 students today",
  },
  {
    id: "set-4",
    title: "Madinah Arabic Book 1",
    terms: 33,
    rating: 5.0,
    reviews: 9,
    author: "UmmKaysan",
    authorRole: "Teacher",
    lastStudied: "16 students recently",
  },
  {
    id: "set-5",
    title: "Al-Kitaab Book 1 Chapter 12",
    terms: 32,
    rating: 5.0,
    reviews: 8,
    author: "qasid-online",
    authorRole: "Teacher",
  },
  {
    id: "set-6",
    title: "Access 2 Unit 1",
    terms: 38,
    rating: 4.0,
    reviews: 10,
    author: "Saopo",
    authorRole: "Teacher",
  },
];
