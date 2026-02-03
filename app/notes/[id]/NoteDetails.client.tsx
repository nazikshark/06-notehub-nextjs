'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

const NoteDetailsClient = ({ id }: NoteDetailsClientProps) => {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (error) return <p>Error loading note.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.tag}>Tag: {note.tag}</p>
      <div className={css.content}>{note.content}</div>
      <div className={css.meta}>
        <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default NoteDetailsClient;