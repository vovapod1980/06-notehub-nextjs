import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "@/services/noteService";

export default function useNotes(perPage: number) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", currentPage, searchQuery] as const,
    queryFn: async () => {
      const response = await fetchNotes({
        page: currentPage,
        perPage,
        search: searchQuery,
      });
      return response;
    },

    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    notes: data?.notes || [],

    totalPages: data ? Number(data.totalPages) : 1,
    currentPage,
    setCurrentPage,
    setSearchQuery,
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : "Сталася помилка",
    addNote: createMutation.mutateAsync,
    removeNote: deleteMutation.mutate,
  };
}
