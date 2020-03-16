import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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
            user: user0
        }
    })

    test('renders title and author but not url or likes', () => {
        const mockHandler = jest.fn()

        const component = render(
            <Blog
                blog={blog}
                onLike={mockHandler}
                onRemove={mockHandler}
                loggedUser={user1}
            />
        )

        expect(component.container).toHaveTextContent(
            'Test Title'
        )

        expect(component.container).toHaveTextContent(
            'Test Author'
        )

        const toggledDiv = component.container.querySelector('.blogFull')

        expect(toggledDiv).toHaveStyle('display: none')
    })

    test('renders url and likes after toggled on', () => {
        const mockHandler = jest.fn()

        const component = render(
            <Blog
                blog={blog}
                onLike={mockHandler}
                onRemove={mockHandler}
                loggedUser={user1}
            />
        )

        const divButton = component.container.querySelector('.blog')
        fireEvent.click(divButton)

        const toggledDiv = component.container.querySelector('.blogFull')

        expect(toggledDiv).not.toHaveStyle('display: none')
    })

    test('calls onLike proper amount of times', () => {
        const mockLikeHandler = jest.fn()
        const mockRemoveHandler = jest.fn()

        const component = render(
            <Blog
                blog={blog}
                onLike={mockLikeHandler}
                onRemove={mockRemoveHandler}
                loggedUser={user1}
            />
        )

        const likeButton = component.getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockLikeHandler.mock.calls.length).toBe(2)
    })
})
