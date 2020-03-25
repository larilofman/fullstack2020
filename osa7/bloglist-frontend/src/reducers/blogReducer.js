import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            return [...state, action.data]
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        case 'COMMENT_BLOG':
        case 'VOTE_BLOG':
            const newState = state.map(blog =>
                blog.id === action.data.id
                    ? action.data
                    : blog
            )
            return newState
        default:
            return state
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const addedBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE_BLOG',
            data: addedBlog
        })
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog.id
        })
    }
}

export const voteBlog = (blog) => {
    return async dispatch => {
        blog.likes++
        const updatedBlog = await blogService.update(blog)
        dispatch({
            type: 'VOTE_BLOG',
            data: updatedBlog
        })
    }
}

export const commentBlog = (blog, comment) => {
    return async dispatch => {
        const updatedBlog = await blogService.addComment(blog, comment)
        dispatch({
            type: 'COMMENT_BLOG',
            data: updatedBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default reducer