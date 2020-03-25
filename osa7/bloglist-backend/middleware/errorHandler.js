const errorHandler = (error, request, response, next) => {

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).send({ error: 'invalid token' })
    }
    else {
        return response.status(400).send({ error: error.error })
    }

    // next(error)
}

module.exports = errorHandler