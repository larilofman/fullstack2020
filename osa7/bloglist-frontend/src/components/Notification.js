import React from 'react'
import '../style/Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (!notification.text) return null

    const classes = `notification ${notification.successful ? 'success' : 'error'}`

    return (
        <div className={classes}>
            <p>{notification.text}</p>
        </div>
    )
}

export default Notification