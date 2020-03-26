import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (!notification.text) return null

    const variant = notification.successful ? 'success' : 'danger'

    return (
        <Alert variant={variant}>
            {notification.text}
        </Alert>
    )
}

export default Notification