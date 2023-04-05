import React from 'react';

import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from 'react-bootstrap';

import { EditTagModalProps } from '../types';

const EditTagModal = ({ availableTags, handleClose, show, onUpdateTag, onDeleteTag }: EditTagModalProps) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Modal title
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control 
                                        type='text' 
                                        value={tag.label} 
                                        onChange={e => onUpdateTag(tag.id, e.target.value)} 
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button onClick={()=>onDeleteTag(tag.id)} variant='outline-danger'>&times;</Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditTagModal