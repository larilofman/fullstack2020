import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

const Recommendations = ({ show }) => {

    const userResult = useQuery(GET_USER)
    const genre = userResult.data && userResult.data.me.favoriteGenre

    const result = useQuery(ALL_BOOKS, {
        skip: !userResult.data,
        variables: {
            genre
        }
    })

    if (!show) {
        return null
    }

    if (result.loading) {
        return (
            <div>Loading...</div>
        )
    }


    const books = result.data.allBooks

    return (
        <div>
            <h2>recommendations</h2>

            <p>books in your favorite genre <strong>{genre}</strong></p>
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

        </div>
    )
}

export default Recommendations