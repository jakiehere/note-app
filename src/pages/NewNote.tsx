import React from 'react';

import NoteForm from '../components/NoteForm';
import { NoteFormProps } from '../types';

const NewNote = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
    return (
        <>
            <h1 className='mb-4'>New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </>
    )
}

export default NewNote