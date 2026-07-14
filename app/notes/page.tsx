import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

async function fetchNotes(limit: number, page: number) {
  const res = await fetch(
    `https://notehub-public.goit.study/api/notes?limit=${limit}&page=${page}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

export default async function NotesPage() {
  const queryClient = new QueryClient();
  const ITEMS_PER_PAGE = 12;

  await queryClient.prefetchQuery({
    queryKey: ["notes", ITEMS_PER_PAGE, 1],
    queryFn: () => fetchNotes(ITEMS_PER_PAGE, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
