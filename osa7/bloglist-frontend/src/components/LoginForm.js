import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'


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
        <div className="form-responsive">
            <h2 className="mb-3">Login</h2>
            <Form id="login-form" onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label htmlFor="username">Username </Form.Label>
                    <Form.Control
                        id="username"
                        type="text"
                        value={username}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                        className="mb-2"
                    />
                    <Form.Label htmlFor="password">Password </Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                        className="mb-2"
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        className="mt-2">Login</Button>
                </Form.Group>
            </Form>
        </div >
    )
}

export default LoginForm