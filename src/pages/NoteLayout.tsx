import React from 'react';

import {
  Navigate,
  Outlet,
  useParams,
} from 'react-router-dom';

import { Note } from '../types';

type NoteLayout = {
    notes: Note[]
}

const NoteLayout = ({ notes }: NoteLayout) => {
    const { id } = useParams()
    const note = notes.find(n => n.id === id)

    if (note === null) return <Navigate to='/' replace />

    return (
        <Outlet context={note} />
    )
}

export default NoteLayout