import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { discardUser } from '../reducers/userReducer'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch(discardUser())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="container">


                <Navbar.Brand style={{ fontSize: "2rem" }} className="mr-4" href="/">Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="mr-4" href="/blogs" as={Link} to="/blogs">Blogs</Nav.Link>
                        <Nav.Link className="mr-4" href="/users" as={Link} to="/users">Users</Nav.Link>

                        {
                            user
                                ? <Nav.Link className="mr-4" as={Link} to="#" onClick={handleLogout}>Logout user {user.name}</Nav.Link>
                                : <Nav.Link className="mr-4" href="/login" as={Link} to="/login">Login</Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar >
    )
}

export default NavBar