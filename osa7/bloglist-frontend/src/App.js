import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import BlogPage from './components/BlogPage'
import UserList from './components/UserList'
import UserPage from './components/UserPage'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import { Switch, Route, Redirect } from 'react-router-dom'


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(setUser())
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <h2>Blogs</h2>
            <Notification />

            <Switch>
                <Route path="/users/:id">
                    <UserPage />
                </Route>
                <Route path="/users">
                    <UserList />
                </Route>
                <Route path="/blogs/:id">
                    <BlogPage />
                </Route>
                <Route path="/blogs">
                    <BlogList />
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/">
                    <Redirect to="/blogs" />
                </Route>
            </Switch>
        </div>

    )
}

export default App