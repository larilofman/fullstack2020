import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const CreateBlog = ({ onSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        onSubmit({ title, author, url })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="form-responsive">
            <h2 className="mb-3">Create new</h2>
            <Form onSubmit={createBlog}>
                <Form.Group>
                    <Form.Label htmlFor="title">Title </Form.Label >
                    <Form.Control
                        id="title"
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <Form.Label htmlFor="author">Author </Form.Label>
                    <Form.Control
                        id="author"
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    <Form.Label htmlFor="url">Url </Form.Label>
                    <Form.Control
                        id="url"
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <Button id="createBlogButton" className="mt-3" type="submit">Create</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

CreateBlog.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default CreateBlog