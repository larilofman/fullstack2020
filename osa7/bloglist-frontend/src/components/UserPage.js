import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const UserPage = () => {
    const history = useHistory()
    const users = useSelector(state => state.users)
    const match = useRouteMatch('/users/:id')
    const user = match
        ? users.find(user => user.id === match.params.id)
        : null

    if (!user) return null

    return (
        <div>
            <Button onClick={() => history.push('/users')}>Back to user list</Button>
            <hr />
            <h2 className="mb-4">{user.name}</h2>

            <h3 className="mb-2">Added blogs</h3>
            {user.blogs.length > 0
                ? user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
                : <p>No added blogs.</p>}
        </div>
    )
}

export default UserPage