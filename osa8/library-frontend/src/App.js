
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './queries'
import { updateCacheWithBook } from './utils'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const cachedToken = localStorage.getItem('kirjasto-user-token')
        if (cachedToken) {
            setToken(cachedToken)
        }
    }, [])

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const book = subscriptionData.data.bookAdded
            window.alert(`Book ${book.title} by ${book.author.name} was added.`)
            updateCacheWithBook(client.cache, book)
        }
    })

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()

        if (page === 'recommendations') {
            setPage('books')
        }
    }

    // not logged in
    if (!token) {
        return (
            <div>
                <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('login')}>login</button>

                </div>

                <Authors
                    show={page === 'authors'}
                    loggedIn={false}
                />

                <Books
                    show={page === 'books'}
                />

                <NewBook
                    show={page === 'add'}
                />

                <LoginForm
                    show={page === 'login'}
                    setToken={setToken}
                    setPage={() => setPage('books')}
                />

            </div>
        )
    }

    // logged in
    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommendations')}>recommendations</button>
                <button onClick={logout}>logout</button>

            </div>

            <Authors
                show={page === 'authors'}
                loggedIn={true}
            />

            <Books
                show={page === 'books'}
            />

            <NewBook
                show={page === 'add'}
            />

            <Recommendations
                show={page === 'recommendations'}
            />

        </div>
    )
}

export default App