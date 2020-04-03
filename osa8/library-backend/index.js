const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/books')
const Author = require('./models/authors')
const User = require('./models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }
`

const resolvers = {
    Query: {
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),
        allBooks: async (root, args) => {

            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                if (args.genre) {
                    return Book.find({ author: author._id, genres: args.genre }).populate('author')
                }
                return Book.find({ author: author._id }).populate('author')
            }

            if (args.genre) {
                return Book.find({ genres: args.genre }).populate('author')
            }

            return Book.find({}).populate('author')
        },
        allAuthors: () => {
            return Author.find({})
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({ author: root.id })

            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                author = new Author({ name: args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }

            }

            const book = new Book(
                {
                    title: args.title,
                    published: args.published,
                    genres: args.genres,
                    author
                })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return book

        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'passu1') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})