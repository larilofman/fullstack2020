const initialState = ''
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.content
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

let timer = null

export const showNotification = (text, showForSeconds, successful) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            content: {
                text,
                successful
            }
        })

        clearTimeout(timer)

        timer = setTimeout(() => {
            dispatch(hideNotification())
        }, showForSeconds * 1000)
    }
}

export const hideNotification = () => {
    clearTimeout(timer)
    return ({
        type: 'HIDE_NOTIFICATION'
    })
}

export default reducer