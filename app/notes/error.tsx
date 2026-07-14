"use client";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function NotesError({ error }: ErrorProps) {
  return <p>Не вдалося отримати список нотаток. {error.message}</p>;
}
