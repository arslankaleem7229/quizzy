import { DragEndEvent } from "@dnd-kit/core";

export interface FlashcardCard {
  id: string;
  term: string;
  definition: string;
  hint?: string;
  explanation?: string;
}

export interface SortableCardProps {
  card: FlashcardCard;
  index: number;
  removeCard: (id: string) => void;
  onChange: (id: string, updates: Partial<FlashcardCard>) => void;
  disabled?: boolean;
}

export interface SmartAssistPanelProps {
  onClose?: () => void;
}

export interface CreateFlashcardPayload {
  title: string;
  description?: string;
  language: string;
  slug: string;
  isPublished: boolean;
  questions: Array<{
    term: string;
    definition: string;
    questionType: "SINGLE_CHOICE";
    hint?: string;
    explanation?: string;
  }>;
}
export interface ValidationResult {
  isValid: boolean;
  message?: string;
  cards?: FlashcardCard[];
}

export interface UseCreateFlashcardsProps {
  cards: FlashcardCard[];
  title: string;
  description: string;
  onError?: (error: string | null) => void;
}

export interface CreateFlashcardsReturns {
  isSubmitting: boolean;
  error: string | null;
  handleCreate: (shouldPractice: boolean) => Promise<void>;
}
export interface ActionIconProps {
  icon: IconComponent;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface FlashcardsReturn {
  cards: FlashcardCard[];
  addCard: () => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, updates: Partial<FlashcardCard>) => void;
  clearCards: () => void;
  shuffleCards: () => void;
  setCards: React.Dispatch<React.SetStateAction<FlashcardCard[]>>;
  handleDragEnd: (event: DragEndEvent) => void;
}

export type IconComponent = React.ComponentType<{ className?: string }>;
