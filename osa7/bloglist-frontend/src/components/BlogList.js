import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import { showNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import { createBlog } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

const BlogList = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1))

    const handleCreateNew = async (newBlog) => {
        dispatch(createBlog(newBlog))
        dispatch(showNotification(`A new blog ${newBlog.title} by ${newBlog.author} added.`, 5, true))
    }

    return (
        <div>
            <h2 className="mb-4">Blogs</h2>


            {user ?

                <Togglable buttonLabel={'New blog'}>
                    <CreateBlog onSubmit={handleCreateNew} />
                </Togglable>

                : <p>Login to add blogs</p>}

            <hr />
            <div id="blog-container">
                <Table striped>
                    <tbody>
                        <tr>
                            <th>Blog</th>
                            <th>Author</th>
                        </tr>
                        {blogs.map(blog =>
                            <Blog key={blog.id} blog={blog} />
                        )}
                    </tbody>
                </Table>

            </div>

        </div >
    )
}

export default BlogList