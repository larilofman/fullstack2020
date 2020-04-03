import _ from 'lodash'

export const findGenres = (allBooks) => allBooks.reduce((genres, book) => {
    return _.union(genres, book.genres)
}, [])