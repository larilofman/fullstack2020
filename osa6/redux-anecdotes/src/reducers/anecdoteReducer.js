import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE':
            const newState = state.map(anecdote =>
                anecdote.id === action.data.id
                    ? action.data
                    : anecdote)
            return newState
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })

    }
}

export const addVoteTo = (anecdote) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })

    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export default reducer