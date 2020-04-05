import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [addBook] = useMutation(ADD_BOOK, {
        update: (client, response) => {
            // add new book to cache
            const bookData = client.readQuery({ query: ALL_BOOKS })

            // query without genre
            client.writeQuery({
                query: ALL_BOOKS,
                data: {
                    allBooks: [...bookData.allBooks, response.data.addBook],
                },
            })

            // query for each genre specified, is this actually be necessary?
            response.data.addBook.genres.forEach(genre => {
                const bookData = client.readQuery({ query: ALL_BOOKS, variables: { genre } })
                client.writeQuery({
                    query: ALL_BOOKS,
                    variables: {
                        genre
                    },
                    data: {
                        allBooks: [...bookData.allBooks, response.data.addBook],
                    },
                })
            });


            // update author cache by incrementing book count or adding a new author
            const authorName = response.data.addBook.author.name
            const authorData = client.readQuery({ query: ALL_AUTHORS })
            const author = authorData.allAuthors.find(a => a.name === authorName)

            if (author) {
                const editedAuthor = { ...author }
                editedAuthor.bookCount++

                client.writeQuery({
                    query: ALL_AUTHORS,
                    data: {
                        allAuthors: authorData.allAuthors.map(a => a.name !== authorName ? a : editedAuthor)
                    }
                })
            } else {
                const newAuthor = {
                    name: response.data.addBook.author.name,
                    born: null,
                    bookCount: 1
                }

                client.writeQuery({
                    query: ALL_AUTHORS,
                    data: {
                        allAuthors: [...authorData.allAuthors, newAuthor]
                    }
                })
            }

        }
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        addBook({ variables: { title, published: Number(published), author, genres } })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                        <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                        <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                        <input
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">add genre</button>
                </div>
                <div>
                    genres: {genres.join(' ')}
                </div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook