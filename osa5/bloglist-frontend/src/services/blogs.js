import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = () => ({ headers: { Authorization: token } })

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, config())
    return response.data
}

const update = async object => {
    const updatedObject =
    {
        title: object.title,
        author: object.author,
        url: object.url,
        likes: object.likes,
        user: object.user.id
    }

    const response = await axios.put(`${baseUrl}/${object.id}`, updatedObject, config())
    return response.data
}

const remove = async object => {
    const response = await axios.delete(`${baseUrl}/${object.id}`, config())
    return response.data
}

export default { setToken, getAll, create, update, remove }