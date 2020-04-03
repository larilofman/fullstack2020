import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { findGenres } from '../utils'

const Books = (props) => {
    const [filter, setFilter] = useState('')
    const result = useQuery(ALL_BOOKS)

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return (
            <div>Loading...</div>
        )
    }

    let books = result.data.allBooks

    const allGenres = findGenres(books)

    if (filter) {
        books = books.filter(b => b.genres.includes(filter))
    }

    return (
        <div>
            <h2>{filter ? `books with the genre of ${filter}` : "all books"}</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {allGenres.map(genre =>
                <button
                    key={genre}
                    onClick={() => setFilter(genre)}>
                    {genre}
                </button>
            )}
            <button onClick={() => setFilter('')}>all genres</button>
        </div>
    )
}

export default Books