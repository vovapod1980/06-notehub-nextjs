import Link from "next/link";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];

  onDelete: UseMutateFunction<Note, Error, string | number, unknown>;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.card}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.viewLink}>
              View details
            </Link>

            <button
              onClick={() => onDelete(note.id)}
              className={css.deleteButton}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
