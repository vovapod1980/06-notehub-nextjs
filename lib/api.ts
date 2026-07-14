//1
import notehubApi from "../api/notehub";
import type { Note, NewNoteData } from "../types/note";

export interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

const AUTH_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<PaginatedNotesResponse> => {
  const response = await notehubApi.get<PaginatedNotesResponse>("/notes", {
    params,
    ...getAuthConfig(),
  });
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await notehubApi.post<Note>(
    "/notes",
    noteData,
    getAuthConfig(),
  );
  return response.data;
};

export const deleteNote = async (id: string | number): Promise<Note> => {
  const response = await notehubApi.delete<Note>(
    `/notes/${id}`,
    getAuthConfig(),
  );
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await notehubApi.get<Note>(`/notes/${id}`, getAuthConfig());
  return response.data;
};
