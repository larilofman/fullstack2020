const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
    // response.json(blogs) works too but why ?
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog(request.body)

    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).json({ error: 'content or url missing' })
    } else {
        blog.user = user._id
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        // Manual populate
        const returnedBlog = savedBlog.toJSON()
        returnedBlog.user = {
            username: user.username,
            name: user.name,
            _id: user.id
        }

        // Requires extra query
        // const returnedBlog = await Blog.findById(savedBlog._id)
        //     .populate('user', { username: 1, name: 1, id: 1 })

        response.status(201).json(returnedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (blog.user.toString() === decodedToken.id.toString()) {
        await blog.remove()
        response.status(204).end()
    }
    else {
        return response.status(403).json({ error: 'unauthorized access' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        likes: request.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter