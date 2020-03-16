import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                Name: <input value={props.newName} onChange={props.handleName} onBlur={props.onBlur} />
            </div>
            <div>
                Number: <input value={props.newNumber} onChange={props.handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm