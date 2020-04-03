import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

const Recommendations = ({ show }) => {
    const userResult = useQuery(GET_USER)
    const [getRecommendations, recommendations] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (!userResult.loading) {
            const genre = userResult.data.me.favoriteGenre
            getRecommendations({ variables: { genre } })
        }
    }, [userResult]) //eslint-disable-line

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>

            <p>books in your favorite genre <strong>{}</strong></p>
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
                    {recommendations.data.allBooks.map(a =>
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