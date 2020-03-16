import React from 'react'
import Person from './Person'

const People = ({ people, handleDelete }) => (
    people.map(person => <Person key={person.id} person={person} onClick={() => handleDelete(person)} />)
)

export default People