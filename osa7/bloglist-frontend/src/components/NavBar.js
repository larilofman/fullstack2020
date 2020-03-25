import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { discardUser } from '../reducers/userReducer'

const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(discardUser())
    }

    return (
        <div>
            <Link to="/blogs">Blogs</Link>
            <Link to="/users">Users</Link>
            {user
                ? <Fragment>
                    <span>{user.name} logged in</span><button onClick={handleLogout}>Logout</button>
                </Fragment>
                : <Link to="/login">Login</Link>}
        </div>
    )
}

export default NavBar