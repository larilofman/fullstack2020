const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return (
        blogs.reduce((sum, item) => {
            return sum + item.likes
        }, 0)
    )
}

const favouriteBlog = (blogs) => {
    const favBlog = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }, {})

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const blogsPerAuthor = _.countBy(blogs, 'author')
    const mostBlogs = _.maxBy(_.keys(blogsPerAuthor), (o) => {
        return blogsPerAuthor[o];
    });

    return {
        author: mostBlogs,
        blogs: blogsPerAuthor[mostBlogs]
    }
}

const mostLikes = (blogs) => {
    // Create an object with authors as keys and their total likes as values
    const authorLikes = blogs.reduce((authors, current) => {
        authors[current.author] = (authors[current.author] || 0) + current.likes
        return authors
    }, {})

    // Find the key with most votes
    const mostLikes = _.maxBy(_.keys(authorLikes), (o) => {
        return authorLikes[o];
    });

    // The key is author and the value of the key is total likes
    return {
        author: mostLikes,
        likes: authorLikes[mostLikes]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}