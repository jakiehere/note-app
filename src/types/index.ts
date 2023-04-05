export type Note = {
    id: string
} & NoteData

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
    title: string
    markdown: string
    tagIds: string[]
}

export type SimplifiedNote = {
    id: string
    title: string
    tags: Tag[]
}

export type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
}

export type Tag = {
    id: string
    label: string
}

export type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export type EditNoteForm = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export type EditTagModalProps = {
    availableTags: Tag[]
    show: boolean
    handleClose: () => void
    onUpdateTag: (id: string, label:string) => void
    onDeleteTag: (id:string) => void
}

export type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
    onUpdateTag: (id: string, label:string) => void
    onDeleteTag: (id:string) => void
}