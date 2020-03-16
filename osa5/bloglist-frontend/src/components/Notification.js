import React from 'react'
import '../style/Notification.css'

const Notification = ({ notification }) => {
    const classes = `notification ${notification.successful ? 'success' : 'error'}`

    return (
        <div className={classes}>
            <p>{notification.text}</p>
        </div>
    )
}

export default Notification