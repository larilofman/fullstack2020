import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './css/index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        personService
            .getAll()
            .then(data => {
                setPersons(data)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
            handlePersonUpdate()
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            showNotification(`Added ${newPerson.name}`)

            personService
                .create(newPerson)
                .then(addedPerson => {
                    setPersons(persons.concat(addedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const handleDelete = (person) => {

        if (window.confirm(`Delete ${person.name} ?`)) {
            showNotification(`Deleted ${person.name}`)

            personService.remove(person.id)
                .then(removedPerson => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }

    }

    const handlePersonUpdate = () => {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            showNotification(`Modified ${newName}`)

            const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
            const updatedPerson = { ...person, number: newNumber }
            personService.update(updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                }).catch(error => {
                    showNotification(`Information of ${newName} has already been removed from server`, false)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }

    const showNotification = (message, successful = true) => {
        setNotification({ message, successful })
        setTimeout(() => setNotification(null), 5000)
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const handleName = (event) => {
        setNewName(event.target.value)
    }

    const handleNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const formatInput = (event) => {
        setNewName(newName.trim())
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
            <label htmlFor="filter">Filter shown: </label>
            <Filter name="filter" value={filter} onChange={handleFilter} />

            <h2>Add a new</h2>
            <PersonForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleName={handleName}
                newNumber={newNumber}
                handleNumber={handleNumber}
                onBlur={formatInput} />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} handleDelete={handleDelete} />

        </div>
    )
}

export default App