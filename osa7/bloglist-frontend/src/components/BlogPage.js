import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, voteBlog } from '../reducers/blogReducer'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import AddComment from './AddComment'
import { commentBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogPage = () => {

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
        dispatch(commentBlog(blog, comment))

    }

    const handleUpdateLikes = () => {
        dispatch(voteBlog(blog))
        dispatch(showNotification(`Voted blog ${blog.title} by ${blog.author}`, 5, true))
    }

    const handleRemoveBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
            dispatch(removeBlog(blog))
            dispatch(showNotification(`Removed blog ${blog.title} by ${blog.author}`, 5, true))
            history.push('/blogs')
        }
    }

    return (
        <div>
            <button onClick={() => history.push('/blogs')}>Back to blog list</button>
            <h2>{blog.title}</h2>
            <p>
                <a href={blog.url} target='_blank' rel="noopener noreferrer">{blog.url}</a>
            </p>
            <span>{blog.likes} likes</span>
            <button onClick={handleUpdateLikes}>Like</button>
            <p>Added by {blog.user.name}</p>

            {user && user.name === blog.user.name
                ? <button onClick={handleRemoveBlog}>
                    Remove
                </button>
                : null}

            <h3>Comments</h3>
            <AddComment onComment={handleAddComment} />
            {blog.comments.map(comment => <li key={uuidv4()}>{comment}</li>)}
        </div>
    )
}

export default BlogPage