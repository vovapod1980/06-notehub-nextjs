import Link from "next/link";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete?: UseMutateFunction<Note, Error, string | number, unknown>;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button
              onClick={() => onDelete?.(note.id)}
              className={css.button}
              disabled={!onDelete}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
