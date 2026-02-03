'use client';

import Link from 'next/link'; // 1. Додали імпорт
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error('Помилка при видаленні:', error);
      alert('Не вдалося видалити нотатку');
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          {/* 2. Обгортаємо заголовок у Link */}
          {/* inline-style гарантує, що колір і підкреслення не зміняться */}
          <Link 
            href={`/notes/${note.id}`} 
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <h2 className={css.title}>{note.title}</h2>
          </Link>
          
          <p className={css.content}>{note.content}</p>
          
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            
            {/* 3. Можна також додати маленьке посилання "Details" поруч із Delete */}
            <div style={{ display: 'flex', gap: '10px' }}>
               <Link href={`/notes/${note.id}`} style={{ fontSize: '14px', color: '#0070f3' }}>
                 View details
               </Link>
               <button 
                className={css.button} 
                onClick={() => deleteMutate(note.id)}
               >
                Delete
               </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;