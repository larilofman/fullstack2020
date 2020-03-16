import React from 'react'

const Notification = ({ notification }) => {
    if (!notification) return null

    const classes = `notification ${notification.successful ? 'success' : 'error'}`
    return (
        <div className={classes}>
            {notification.message}
        </div>
    )
}

export default Notification