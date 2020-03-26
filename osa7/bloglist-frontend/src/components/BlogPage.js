import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, voteBlog } from '../reducers/blogReducer'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import AddComment from './AddComment'
import { commentBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, Modal } from 'react-bootstrap'

const BlogPage = () => {
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const history = useHistory()

    const match = useRouteMatch('/blogs/:id')
    const blog = match
        ? blogs.find(blog => blog.id === match.params.id)
        : null

    if (!blog) return null

    const handleAddComment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        comment
            ? dispatch(commentBlog(blog, comment))
            : dispatch(showNotification(`Cannot send an empty comment`, 5, false))
    }

    const handleUpdateLikes = () => {
        dispatch(voteBlog(blog))
        dispatch(showNotification(`Voted blog ${blog.title} by ${blog.author}`, 5, true))
    }

    const handleRemoveBlog = () => {
        dispatch(removeBlog(blog))
        dispatch(showNotification(`Removed blog ${blog.title} by ${blog.author}`, 5, true))
        history.push('/blogs')
    }

    return (
        <div>
            <Button onClick={() => history.push('/blogs')}>Back to blog list</Button>
            <hr />
            <div className="form-responsive">
                <h2>{blog.title}</h2>
                <p>
                    <a href={blog.url} target='_blank' rel="noopener noreferrer">{blog.url}</a>
                </p>
                <span>{blog.likes} likes</span>
                <Button variant="success" className="m-2" onClick={handleUpdateLikes}>Like</Button>
                <p>Added by {blog.user.name}</p>

                {user && user.name === blog.user.name
                    ? <Button
                        variant="danger"
                        onClick={() => setShowModal(true)}>
                        Remove
                </Button>
                    : null}

                <h3 className="my-3">Comments</h3>
                <AddComment onComment={handleAddComment} />
                {blog.comments.map(comment => <li key={uuidv4()}>{comment}</li>)}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>


                <Modal.Header closeButton style={{ borderBottom: "none" }}>
                    <Modal.Title>{`Remove blog ${blog.title} by ${blog.author} ?`}</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{ borderTop: "none" }}>
                    <Button variant="danger" onClick={handleRemoveBlog}>
                        Remove
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default BlogPage