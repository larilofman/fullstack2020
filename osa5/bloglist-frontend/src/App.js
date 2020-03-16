import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({ text: '', successful: false })

    const sortBlogs = (blogs) => (blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1))

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(sortBlogs(blogs))
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {
            showNotification('Wrong username or password.', false)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const handleCreateNew = async (newBlog) => {
        const addedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(addedBlog))
        showNotification(`A new blog ${addedBlog.title} by ${addedBlog.author} added.`, true)
    }

    const handleUpdateLikes = async (blog) => {
        blog.likes++
        const updatedBlog = await blogService.update(blog)
        setBlogs(sortBlogs(blogs).map(b => b.id !== blog.id ? b : updatedBlog))
    }

    const handleRemoveBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
            await blogService.remove(blog)
            setBlogs(sortBlogs(blogs).filter(b => b.id !== blog.id))
            showNotification(`Removed blog ${blog.title} by ${blog.author}`, false)
        }
    }

    const showNotification = (text, successful) => {
        setNotification(
            {
                text,
                successful
            })

        setTimeout(() => setNotification({ text: '', successful: false }), 5000)
    }

    if (user === null) {
        return (
            <div>
                <h2>Login</h2>
                {notification.text ? <Notification notification={notification} /> : null}
                <form id="login-form" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            name="username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            name="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>

            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            {notification.text ? <Notification notification={notification} /> : null}
            <span>{user.name} logged in</span>
            <button
                onClick={handleLogout}
            >
                Logout
            </button>
            <Togglable buttonLabel={'New blog'}>
                <CreateBlog onSubmit={handleCreateNew} />
            </Togglable>
            <div id="blog-container">
                {blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        onLike={handleUpdateLikes}
                        onRemove={handleRemoveBlog}
                        loggedUser={user} />
                )}
            </div>

        </div>
    )
}

export default App