import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(addVoteTo(anecdote))
        dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
    }

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return (
            anecdotes
                .filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
                .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
        )
    })

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
