import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(action.data))
            blogService.setToken(action.data.token)
            return action.data
        case 'SET_USER':
            const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                blogService.setToken(user.token)
                return user
            }
            return null
        case 'DISCARD_USER':
            return null
        default:
            return state
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        dispatch({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const setUser = () => {
    return ({
        type: 'SET_USER'
    })
}

export const discardUser = (user) => {
    return {
        type: 'DISCARD_USER'
    }
}

export default reducer