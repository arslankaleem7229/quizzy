import { CreateFlashcards } from "@/features/create-flashcards";

export default async function CreateFlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  //use this for differntiaite between terms and quizz
  // console.log((await searchParams).type);

  return <CreateFlashcards />;
}
