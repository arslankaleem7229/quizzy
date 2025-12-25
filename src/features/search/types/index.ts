export interface User {
  id: string;
  name: string;
  flashcards: number;
  classes: number;
  color: string;
}

export interface FlashcardSet {
  id: string;
  title: string;
  terms: number;
  rating: number;
  reviews: number;
  author: string;
  authorRole: string;
  studentsToday?: number;
  lastStudied?: string;
}

export interface Tab {
  label: string;
  filter?: string;
}
