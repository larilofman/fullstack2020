import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import personService from './services/people'
import Notification from './components/Notification'
import './css/index.css'

const App = () => {
    const [people, setPeople] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)

    const peopleToShow = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    useEffect(() => {
        personService
            .getAll()
            .then(data => {
                setPeople(data)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (people.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
            handlePersonUpdate()
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }

            personService
                .create(newPerson)
                .then(createdPerson => {
                    setPeople(people.concat(createdPerson))
                    setNewName('')
                    setNewNumber('')
                    showNotification(`Added ${newPerson.name}`)
                })
                .catch(error => {
                    console.log('Error adding person:', error.response.data.error)
                    showNotification(error.response.data.error, false)
                })
        }
    }

    const handleDelete = (person) => {

        if (window.confirm(`Delete ${person.name} ?`)) {
            showNotification(`Deleted ${person.name}`)

            personService.remove(person.id)
                .then(removedPerson => {
                    setPeople(people.filter(p => p.id !== person.id))
                })
        }

    }

    const handlePersonUpdate = () => {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const person = people.find(p => p.name.toLowerCase() === newName.toLowerCase())
            const updatedPerson = { ...person, number: newNumber }
            personService.update(updatedPerson)
                .then(returnedPerson => {
                    setPeople(people.map(p => p.id !== person.id ? p : returnedPerson))
                    showNotification(`Modified ${newName}`)
                    setNewName('')
                    setNewNumber('')
                }).catch(error => {
                    personService.get(person.id)
                        .then(errorPerson => {
                            console.log('Error editing person:', error.response.data.error)
                            showNotification(error.response.data.error, false)
                        }).catch(error => {
                            showNotification(`Information of ${newName} has already been removed from server`, false)
                            setPeople(people.filter(p => p.id !== person.id))
                        })
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

            <Filter value={filter} onChange={handleFilter} />

            <h2>Add a new</h2>
            <PersonForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleName={handleName}
                newNumber={newNumber}
                handleNumber={handleNumber}
                onBlur={formatInput} />

            <h2>Numbers</h2>
            <People people={peopleToShow} handleDelete={handleDelete} />

        </div>
    )
}

export default App