import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { BrowserRouter as Router } from 'react-router-dom'

describe('<Blog />', () => {
    let user0
    let user1
    let blog

    beforeEach(() => {
        user0 = {
            name: 'Test User',
            username: 'testuser'
        }
        user1 = {
            name: 'Test User1',
            username: 'testuser1'
        }
        blog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'https://www.test.com',
            likes: 13,
            user: user0,
            id: 666
        }
    })

    test('renders title and author but not url or likes', () => {
        const mockHandler = jest.fn()

        const component = render(
            <Router>
                <table>
                    <tbody>
                        <Blog
                            blog={blog}
                            onLike={mockHandler}
                            onRemove={mockHandler}
                            loggedUser={user1}
                        />
                    </tbody>
                </table>

            </Router>
        )

        expect(component.container).toHaveTextContent(
            'Test Title'
        )

        expect(component.container).toHaveTextContent(
            'Test Author'
        )

        expect(component.container).not.toHaveTextContent(
            'https://www.test.com'
        )
    })
})
