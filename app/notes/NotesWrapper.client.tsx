"use client";

import dynamic from "next/dynamic";

// Ось тут ssr: false дозволено і працює ідеально!
const DynamicNotesClient = dynamic(() => import("./Notes.client"), {
  ssr: false,
  loading: () => <p>Завантаження, зачекайте...</p>, // покаже лоадер, поки JS вантажиться в браузері
});

export default function NotesWrapper() {
  return <DynamicNotesClient />;
}
