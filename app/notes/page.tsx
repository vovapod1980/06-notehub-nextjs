// import {
//   QueryClient,
//   dehydrate,
//   HydrationBoundary,
// } from "@tanstack/react-query";
// import NotesClient from "./Notes.client";

// async function fetchNotes(limit: number, page: number) {
//   const res = await fetch(
//     `https://notehub-public.goit.study/api/notes?limit=${limit}&page=${page}`,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch notes");
//   }

//   return res.json();
// }

// export default async function NotesPage() {
//   const queryClient = new QueryClient();
//   const ITEMS_PER_PAGE = 12;

//   await queryClient.prefetchQuery({
//     queryKey: ["notes", ITEMS_PER_PAGE, 1],
//     queryFn: () => fetchNotes(ITEMS_PER_PAGE, 1),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NotesClient />
//     </HydrationBoundary>
//   );
// }

// import {
//   QueryClient,
//   dehydrate,
//   HydrationBoundary,
// } from "@tanstack/react-query";
// import dynamic from "next/dynamic"; // 1. Імпортуємо утиліту динамічного імпорту

// // 2. Завантажуємо NotesClient виключно на клієнті, ігноруючи рендеринг DOM на сервері
// const NotesClient = dynamic(() => import("./Notes.client"), {
//   ssr: false,
// });

// async function fetchNotes(limit: number, page: number) {
//   const res = await fetch(
//     `https://notehub-public.goit.study/api/notes?limit=${limit}&page=${page}`,
//     {
//       cache: "no-store",
//     },
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch notes");
//   }

//   return res.json();
// }

// export default async function NotesPage() {
//   const queryClient = new QueryClient();
//   const ITEMS_PER_PAGE = 12;

//   // Попереднє завантаження даних у кеш на сервері працює як і раніше
//   await queryClient.prefetchQuery({
//     queryKey: ["notes", ITEMS_PER_PAGE, 1],
//     queryFn: () => fetchNotes(ITEMS_PER_PAGE, 1),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NotesClient />
//     </HydrationBoundary>
//   );
// }

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesWrapper from "./NotesWrapper.client"; // Імпортуємо новий проміжний компонент

async function fetchNotes(limit: number, page: number) {
  const res = await fetch(`https://goit.study{limit}&page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch notes");
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
      <NotesWrapper />
    </HydrationBoundary>
  );
}
