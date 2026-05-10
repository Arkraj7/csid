'use client';

import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import {
  StickyNote,
  X,
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  ChevronRight,
  Save,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

interface Note {
  id: string;
  text: string;
  timestamp: number;
}

const NOTES_COLLECTION = 'user_notes';

export default function FloatingNotepad() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const userIdRef = useRef<string | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        userIdRef.current = user.uid;
        await loadNotes(user.uid);
      } else {
        setIsAuthenticated(false);
        userIdRef.current = null;
        setNotes([]);
        setActiveNote(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadNotes = async (userId: string) => {
    try {
      const db = getFirestore();
      const notesRef = doc(db, NOTES_COLLECTION, userId);
      const notesSnap = await getDoc(notesRef);

      if (notesSnap.exists()) {
        const data = notesSnap.data();
        const notesData = data.notes || [];
        setNotes(notesData.sort((a: Note, b: Note) => b.timestamp - a.timestamp));
        if (notesData.length > 0) {
          setActiveNote(notesData[0]);
          setShowPlaceholder(notesData[0].text === '');
        }
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    if (!userIdRef.current) return;

    setIsSaving(true);
    try {
      const db = getFirestore();
      const notesRef = doc(db, NOTES_COLLECTION, userIdRef.current);
      await setDoc(
        notesRef,
        {
          notes: updatedNotes,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      toast.success('Note saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save note');
    }
    setIsSaving(false);
  };

  const createNewNote = async () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      text: '',
      timestamp: Date.now(),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setActiveNote(newNote);
    setShowPlaceholder(true);

    if (userIdRef.current) {
      await saveNotes(updatedNotes);
    }

    setTimeout(() => editorRef.current?.focus(), 100);
  };

  const handleEditorInput = () => {
    if (!activeNote) return;

    const html = editorRef.current?.innerHTML || '';
    const stripped = html.replace(/<[^>]*>/g, '').trim();
    setShowPlaceholder(stripped === '');

    const updatedNote = { ...activeNote, text: html, timestamp: Date.now() };

    const updatedNotes = notes.map((n) => (n.id === activeNote.id ? updatedNote : n));
    setNotes(updatedNotes);
    setActiveNote(updatedNote);
  };

  const handleSaveNote = async () => {
    if (!activeNote) return;
    await saveNotes(notes);
  };

  const handleDeleteNote = async (noteId: string) => {
    const updatedNotes = notes.filter((n) => n.id !== noteId);
    setNotes(updatedNotes);

    if (activeNote?.id === noteId) {
      const newActive = updatedNotes[0] || null;
      setActiveNote(newActive);
      setShowPlaceholder(newActive ? newActive.text === '' : true);
    }

    await saveNotes(updatedNotes);
  };

  const applyFormat = (command: string, value?: string) => {
    if (command === 'hiliteColor') {
      document.execCommand('hiliteColor', false, '#fef08a');
    } else {
      document.execCommand(command, false, value);
    }
    editorRef.current?.focus();
    handleEditorInput();
  };

  const toggleNotepad = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsExpanded(true);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleNoteSelect = (note: Note) => {
    setActiveNote(note);
    setShowPlaceholder(note.text === '');
    if (editorRef.current) {
      editorRef.current.innerHTML = note.text;
    }
  };

  if (!isAuthenticated && !isLoading) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleNotepad}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-primary text-primary-foreground rounded-l-xl shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center ${
          isOpen && isExpanded ? 'translate-x-80' : 'translate-x-0'
        }`}
        aria-label="Toggle notes"
      >
        {isOpen && isExpanded ? (
          <ChevronRight size={20} />
        ) : (
          <>
            <StickyNote size={20} className="mr-1" />
            Notes
          </>
        )}
      </button>

      {/* Notepad Panel */}
      <div
        className={`fixed right-0 top-20 bottom-4 z-50 w-80 bg-white dark:bg-gray-900 rounded-l-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ${
          isOpen && isExpanded ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <StickyNote size={18} className="text-primary" />
            <h3 className="font-bold text-gray-900 dark:text-white">My Notes</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={createNewNote}
              className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-xs font-medium"
            >
              + New
            </button>
            <button
              onClick={toggleNotepad}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close notes"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notes List */}
        {notes.length > 0 && (
          <div className="border-b border-gray-200 dark:border-gray-700 max-h-32 overflow-y-auto">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => handleNoteSelect(note)}
                className={`w-full text-left px-4 py-2 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  activeNote?.id === note.id ? 'bg-primary/10' : ''
                }`}
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {note.text.replace(/<[^>]*>/g, '') || 'Empty note'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(note.timestamp).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Active Note Editor */}
        {activeNote && (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 flex-wrap">
              <button
                onClick={() => applyFormat('bold')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Bold"
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => applyFormat('italic')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Italic"
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => applyFormat('strikethrough')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Strikethrough"
              >
                <Strikethrough size={16} />
              </button>
              <button
                onClick={() => applyFormat('hiliteColor')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Highlight"
              >
                <Highlighter size={16} />
              </button>
              <div className="flex-1" />
              <button
                onClick={() => handleDeleteNote(activeNote.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-xs"
              >
                Delete
              </button>
              <button
                onClick={handleSaveNote}
                disabled={isSaving}
                className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs font-medium"
              >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Save
              </button>
            </div>

            {/* ContentEditable Editor */}
            <div className="flex-1 relative">
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                suppressContentEditableWarning
                className="flex-1 w-full p-4 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 bg-transparent outline-none min-h-full"
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: activeNote.text }}
              />
              {showPlaceholder && (
                <div className="absolute top-4 left-4 text-gray-400 pointer-events-none text-sm">
                  Start typing your notes...
                </div>
              )}
            </div>
          </div>
        )}

        {notes.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <StickyNote size={40} className="text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">No notes yet</p>
            <button
              onClick={createNewNote}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Create your first note
            </button>
          </div>
        )}
      </div>
    </>
  );
}
