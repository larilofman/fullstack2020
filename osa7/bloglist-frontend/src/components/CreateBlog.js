import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
        <div>
            <h2>Create new</h2>
            <form onSubmit={createBlog}>
                <div>
                    <label htmlFor="title">Title </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author </label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url">Url </label>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id="createBlogButton" type="submit">Create</button>
            </form>
        </div>
    )
}

CreateBlog.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default CreateBlog