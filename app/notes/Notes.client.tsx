"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useNotes from "@/hooks/useNotes";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotesPage.module.css";

const ITEMS_PER_PAGE = 12;

export default function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    notes,
    totalPages,
    currentPage,
    setCurrentPage,
    setSearchQuery,
    isLoading,
    isError,
    errorMessage,
    removeNote,
  } = useNotes(ITEMS_PER_PAGE);

  const debouncedSearchHandler = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearchHandler} />

        {!isLoading && !isError && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>

      <main className={css.mainContent}>
        {isError && <ErrorMessage message={errorMessage} />}

        {isLoading ? (
          <Loader />
        ) : (
          notes &&
          notes.length > 0 && <NoteList notes={notes} onDelete={removeNote} />
        )}
      </main>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
