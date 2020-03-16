import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleDelete }) => (
    persons.map(person => <Person key={person.id} person={person} onClick={() => handleDelete(person)} />)
)

export default Persons