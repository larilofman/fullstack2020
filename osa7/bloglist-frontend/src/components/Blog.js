import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    return (
        <tr>
            <td>
                <Link to={`blogs/${blog.id}`}>{`${blog.title}`}</Link>
            </td>
            <td>
                {`${blog.author}`}
            </td>
        </tr>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Blog
