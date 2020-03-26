import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

const UserList = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div>
            <h2 className="mb-4">Users</h2>
            <Table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Blogs added</th>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList