import _ from 'lodash'

// find all genres on all the books and filter out empty string
export const findGenres = (allBooks) => allBooks.reduce((genres, book) => {
    return _.union(genres, book.genres)
}, []).filter(g => g !== "")