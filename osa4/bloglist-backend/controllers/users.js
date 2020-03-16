const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs')
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.find({ _id: request.params.id })
    response.json(user)
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (body.password.length < 3) {
        return next({ error: 'password must contain at least 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter