const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {

    let testToken = null

    beforeEach(async () => {
        // Insert initial blogs in db
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

        // Create user
        await User.deleteMany({})
        await api
            .post('/api/users')
            .send({ username: 'testi', name: 'testinimi', password: 'passu1' })

        // Login user
        const res = await api
            .post('/api/login')
            .send({ username: 'testi', password: 'passu1' })

        // Set token for tests
        testToken = res.body.token

        // Set testUser as the user of every blog
        const testUser = await User.findOne({ username: 'testi' })
        await Blog.updateMany({}, { user: testUser._id })
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('right amount of blogs is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blogs have a field named "id"', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    describe('addition of a blog', () => {

        test('succeeds with a valid data and authentication', async () => {
            const newBlog = {
                title: "Testititle1",
                author: "Testi Author1",
                url: "http://www.blogi.fi",
                likes: 0
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${testToken}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsInEnd = await helper.blogsInDb()
            expect(blogsInEnd.length).toBe(helper.initialBlogs.length + 1)

            const titles = blogsInEnd.map(blog => blog.title)
            expect(titles).toContain(newBlog.title)
        })

        test('fails without token authorization', async () => {
            const newBlog = {
                title: "Not Authenticated",
                author: "Santa Claus",
                url: "http://www.interwebz-sivu.fi",
                likes: 0
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)

            const blogsInEnd = await helper.blogsInDb()
            expect(blogsInEnd.length).toBe(helper.initialBlogs.length)

            const titles = blogsInEnd.map(blog => blog.title)
            expect(titles).not.toContain(newBlog.title)
        })

        test('sets likes to 0 in case it is undefined', async () => {
            const newBlog = {
                title: "Testititle2",
                author: "Testi Author2",
                url: "http://www.google.com"
            }

            const addedBlog = await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${testToken}`)
                .send(newBlog)

            const addedBlogInDb = await Blog.findById(addedBlog.body.id)

            expect(addedBlogInDb.likes).toBe(0)
        })

        test('fails with statuscode 400 if title and url are not defined', async () => {
            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${testToken}`)
                .send({})
                .expect(400)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with statuscode 204 if authenticated is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `bearer ${testToken}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

            const titles = blogsAtEnd.map(blog => blog.title)
            expect(titles).not.toContain(blogToDelete.title)
        })

        test('fails with statuscode 401 if authenticated is invalid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `bearer n074r34l70k3n`)
                .expect(401)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

            const titles = blogsAtEnd.map(blog => blog.title)
            expect(titles).toContain(blogToDelete.title)
        })
    })

    describe('modification of a blog', () => {
        test('succeeds with statuscode 200 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToEdit = blogsAtStart[0]

            await api.put(`/api/blogs/${blogToEdit.id}`)
                .send({ likes: 66666666666 })
                .expect(200)

            const editedBlogInDb = await Blog.findById(blogToEdit.id)
            expect(editedBlogInDb.likes).toBe(66666666666)
        })
    })

    describe('when there is initially one user in db', () => {
        beforeEach(async () => {
            await User.deleteMany({})
            user = new User({ username: 'takenUser', name: 'Taken Name', passwordHash: 'k31n0t3k01n3np455uh45h' })
            await user.save()
        })

        test('creation succeeds with a fresh user name', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser =
            {
                username: 'test2',
                name: 'Test Name2',
                password: '1234567'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(user => user.username)
            expect(usernames).toContain(newUser.username)
        })

        test('creation fails with password shorter than 3 characters', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser =
            {
                username: 'test3',
                name: 'Test Name3',
                password: '12'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('password must contain at least 3 characters')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)

            const usernames = usersAtEnd.map(user => user.username)
            expect(usernames).not.toContain(newUser.username)
        })

        test('creation fails with a taken username', async () => {
            const usersAtStart = await helper.usersInDb()
            const newUser =
            {
                username: 'takenUser',
                name: 'Duplikaatti',
                password: 'passu'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('unique')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
        })
    })
})



afterAll(() => {
    mongoose.connection.close()
})