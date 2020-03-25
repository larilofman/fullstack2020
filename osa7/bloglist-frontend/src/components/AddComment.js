import React from 'react'

const AddComment = ({ onComment }) => {

    return (
        <form onSubmit={onComment}>
            <input type="text" name="comment" />
            <button type="submit">Add comment</button>
        </form>
    )
}

export default AddComment