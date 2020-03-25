import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

test('<CreateBlog /> calls onSubmit with correct values', () => {
    const createBlog = jest.fn()

    const component = render(
        <CreateBlog onSubmit={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'Testi Title' }
    })

    fireEvent.change(author, {
        target: { value: 'Testi Author' }
    })

    fireEvent.change(url, {
        target: { value: 'https://www.testi.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls.length).toBe(1)

    const argObj = createBlog.mock.calls[0][0]

    expect(argObj.title).toBe('Testi Title')
    expect(argObj.author).toBe('Testi Author')
    expect(argObj.url).toBe('https://www.testi.com')
})