"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <p>Завантаження, зачекайте, будь ласка...</p>;
  }

  if (isError || !note) {
    return <p>Щось пішло не так.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <button onClick={() => router.back()} className={css.backButton}>
          ← Back to notes{" "}
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          {note.tag && <p className={css.tag}>{note.tag}</p>}
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {note.createdAt
              ? new Date(note.createdAt).toLocaleDateString()
              : "Дата створення невідома"}
          </p>
        </div>
      </div>
    </main>
  );
}
