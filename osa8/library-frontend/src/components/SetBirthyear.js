import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const SetBirthyear = ({ authors }) => {
    const [year, setYear] = useState('')

    const options = authors.map(a => (
        { value: a.name, label: a.name }
    ))

    const [selected, setSelected] = useState(options[0])

    const [changeAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const submit = (event) => {
        event.preventDefault()

        changeAuthor({ variables: { name: selected.value, setBornTo: Number(year) } })

        setYear('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form submit="submit">
                <Select
                    value={selected}
                    onChange={setSelected}
                    options={options} />
                <div>
                    Year
                    <input
                        value={year}
                        onChange={({ target }) => setYear(target.value)}
                    />
                </div>
                <button onClick={submit}>Update author</button>
            </form>
        </div>
    )
}

export default SetBirthyear