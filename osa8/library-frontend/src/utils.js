import _ from 'lodash'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

// find all genres on all the books and filter out empty string
export const findGenres = (allBooks) => allBooks.reduce((genres, book) => {
    return _.union(genres, book.genres)
}, []).filter(g => g !== "")

export const updateCacheWithBook = (cache, book) => {
    // get all books
    const bookData = cache.readQuery({ query: ALL_BOOKS })

    // stop if book is already in cache(added from this client)
    if (bookData.allBooks.map(b => b.id).includes(book.id)) {
        return
    }

    // query without genre
    cache.writeQuery({
        query: ALL_BOOKS,
        data: {
            allBooks: [...bookData.allBooks, book],
        },
    })

    // query for each genre of the book
    book.genres.forEach(genre => {
        // check if cache exists for the genre
        if (cache.data.data.ROOT_QUERY[`allBooks({"genre":"${genre}"})`]) {
            const bookData = cache.readQuery({ query: ALL_BOOKS, variables: { genre } })
            cache.writeQuery({
                query: ALL_BOOKS,
                variables: {
                    genre
                },
                data: {
                    allBooks: [...bookData.allBooks, book],
                },
            })
        }
    });


    // update author cache by incrementing book count or adding a new author
    const authorName = book.author.name
    const authorData = cache.readQuery({ query: ALL_AUTHORS })
    const author = authorData.allAuthors.find(a => a.name === authorName)

    if (author) {
        const editedAuthor = { ...author }
        editedAuthor.bookCount++

        cache.writeQuery({
            query: ALL_AUTHORS,
            data: {
                allAuthors: authorData.allAuthors.map(a => a.name !== authorName ? a : editedAuthor)
            }
        })
    } else {
        const newAuthor = {
            name: book.author.name,
            born: null,
            bookCount: 1
        }

        cache.writeQuery({
            query: ALL_AUTHORS,
            data: {
                allAuthors: [...authorData.allAuthors, newAuthor]
            }
        })
    }
}
