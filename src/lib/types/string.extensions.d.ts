declare global {
  interface String {
    capitalize(): string;
    slugify(): string;
  }
}

export {};
