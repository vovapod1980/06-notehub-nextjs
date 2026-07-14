"use client";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function NoteDetailsError({ error }: ErrorProps) {
  return <p>Не вдалося отримати деталі нотатки. {error.message}</p>;
}
