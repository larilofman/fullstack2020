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

export const showNotification = (notification, showForSeconds) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            content: notification
        })

        clearTimeout(timer)

        timer = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, showForSeconds * 1000)
    }
}

export default reducer