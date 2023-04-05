import React, {
  FormEvent,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Col,
  Form,
  Row,
  Stack,
} from 'react-bootstrap';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import CreateableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from 'uuid';

import {
  NoteFormProps,
  Tag,
} from '../types';

const NoteForm = ({
    onSubmit,
    onAddTag,
    availableTags,
    title = "",
    markdown = "",
    tags = []
}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })

        navigate('..')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} defaultValue={title} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreateableReactSelect
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti
                                />
                        </Form.Group>
                    </Col>
                </Row>
                <Col>
                    <Form.Group controlId='markdown'>
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" ref={markdownRef} rows={15} defaultValue={markdown} required />
                    </Form.Group>
                </Col>
                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type='submit' variant='primary'>Save</Button>
                    <Link to='..'>
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteForm