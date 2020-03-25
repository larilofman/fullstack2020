import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'


const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = async event => {
        event.preventDefault()

        try {
            await dispatch(loginUser(username, password))
            dispatch(hideNotification())
            history.push('/blogs')
        } catch (exception) {
            dispatch(showNotification('Wrong username or password.', 5, false))
        }
    }

    return (
        <div>
            <h2>Login</h2>
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

export default LoginForm