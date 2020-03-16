import React from 'react'

const Person = ({ person, onClick }) => {
    return (
        <div>
            <span>{person.name} {person.number}</span>
            <button onClick={onClick}>Delete</button>
        </div>
    )
}

export default Person