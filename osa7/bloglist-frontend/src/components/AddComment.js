import React from 'react'
import { Button } from 'react-bootstrap'

const AddComment = ({ onComment }) => {

    return (
        <form onSubmit={onComment}>
            <input type="text" name="comment" />
            <Button className="m-2" type="submit">Add comment</Button>
        </form>
    )
}

export default AddComment