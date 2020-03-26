describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user0 = {
            name: 'Lari Löfman',
            username: 'coco',
            password: 'passu1'
        }
        const user1 = {
            name: 'Wrong User',
            username: 'test',
            password: 'passu2'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user0)
        cy.request('POST', 'http://localhost:3001/api/users', user1)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Login').click()
        cy.get('#login-form')
    })

    describe('Login', function () {
        beforeEach(function () {
            cy.contains('Login').click()
        })
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('coco')
            cy.get('#password').type('passu1')
            cy.get('#login-button').click()

            cy.contains('Logout user Lari Löfman')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('coco')
            cy.get('#password').type('vääräpassu1')
            cy.get('#login-button').click()

            cy.contains('Wrong username or password.')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'coco', password: 'passu1' })
        })

        it('A blog can be created', function () {
            cy.contains('New blog').click()

            cy.get('#title').type('Title by cypress')
            cy.get('#author').type('Author by cypress')
            cy.get('#url').type('http://www.cypress.fi')
            cy.get('#createBlogButton').click()

            cy.get('#blog-container')
                .contains('Title by cypress')

            cy.get('#blog-container')
                .contains('Author by cypress')
        })

        describe('When several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'Title1', author: 'Author1', url: 'http://www.google.com', likes: 7 })
                cy.createBlog({ title: 'Title2', author: 'Author2', url: 'http://www.google.fi', likes: 13 })
                cy.createBlog({ title: 'Title3', author: 'Author3', url: 'http://www.google.se', likes: 85 })
            })

            it('A blog can be liked', function () {
                cy.contains('Title2').click()
                cy.contains('Like').click()
                    .parent().contains('14 likes')
            })

            it('Blogs are sorted by likes in descending order', function () {

                cy.get('.blog')
                    .then((blogs) => {
                        cy.wrap(blogs[0]).contains('Title3')
                        cy.wrap(blogs[1]).contains('Title2')
                        cy.wrap(blogs[2]).contains('Title1')
                    })

            })
        })

        describe('Removing a blog', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'Delete Me', author: 'Author', url: 'http://www.google.com' })
            })

            it('succeeds by right user', function () {
                cy.contains('Delete Me').click()
                cy.contains('Remove').click()
                cy.get('#remove-button').click()

                cy.contains('Removed blog Delete Me by Author')
            })

            it('fails by wrong user', function () {
                cy.login({ username: 'test', password: 'passu2' })
                cy.contains('Delete Me').click()

                cy.contains('Remove').should('not.exist')
            })
        })
    })
})