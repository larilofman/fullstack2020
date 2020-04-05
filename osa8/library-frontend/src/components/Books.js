import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { findGenres } from '../utils'

const Books = (props) => {
    const [books, setBooks] = useState([])
    const [filter, setFilter] = useState('')
    const [getBooks, result] = useLazyQuery(ALL_BOOKS)
    const [allGenres, setAllGenres] = useState([])

    // set books to show when data from backend arrives
    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks)

            // find all the different genres
            if (!filter) {
                setAllGenres(findGenres(result.data.allBooks))
            }
        }
    }, [result]) // eslint-disable-line

    // get data from backend when filter changes
    useEffect(() => {
        if (filter) {
            getBooks({ variables: { genre: filter } })
        } else {
            getBooks()
        }
    }, [filter]) // eslint-disable-line

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {filter ? <p>books with the genre of <strong>{filter}</strong></p> : <p>all books</p>}

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