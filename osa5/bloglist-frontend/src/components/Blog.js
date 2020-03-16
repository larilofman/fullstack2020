import React, { useState } from 'react'
import '../style/Blog.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onRemove, loggedUser }) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const like = (event) => {
        event.stopPropagation()
        onLike(blog)
    }

    const remove = (event) => {
        event.stopPropagation()
        onRemove(blog)
    }

    const rightUser = () => {
        return (loggedUser.username === blog.user.username)
    }

    return (
        <div className='blog' onClick={toggleVisibility}>
            <p>{blog.title} by {blog.author}</p>
            <div className='blogFull' style={showWhenVisible}>
                <p><a href={blog.url} target='_blank' rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{blog.url}</a></p>
                <span>{blog.likes} likes</span>
                <button onClick={like}>Like</button>
                <p>Added by {blog.user.name}</p>
                {rightUser() ? <button onClick={remove}>Remove</button> : null}
            </div>
        </div >
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    onLike: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired
}

export default Blog
