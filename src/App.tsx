import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useMemo } from 'react';

import { Container } from 'react-bootstrap';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

import Note from './components/Note';
import { useLocalStorage } from './hooks/useLocalStorage';
import EditNote from './pages/EditNote';
import NewNote from './pages/NewNote';
import NoteLayout from './pages/NoteLayout';
import NoteList from './pages/NoteList';
import {
  NoteData,
  RawNote,
  Tag,
} from './types';

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      const newNote: RawNote = {
        id: uuidV4(),
        title: data.title,
        markdown: data.markdown,
        tagIds: tags.map(tag => tag.id),
      };
      return [...prevNotes, newNote];
    });
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    });
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route
          path='/'
          element={<NoteList
            notes={notesWithTags} 
            availableTags={tags}
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
          />}
        />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />} >
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path='edit' element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
