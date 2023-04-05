import React from 'react';

import NoteForm from '../components/NoteForm';
import { useNote } from '../hooks/useNote';
import { EditNoteForm } from '../types';

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteForm) => {
    const note = useNote( )
    return (
        <>
            <h1 className='mb-4'>Edit Note</h1>
            <NoteForm 
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={data=>onSubmit(note.id, data)} 
                onAddTag={onAddTag} 
                availableTags={availableTags} 
            />
        </>
    )
}

export default EditNote