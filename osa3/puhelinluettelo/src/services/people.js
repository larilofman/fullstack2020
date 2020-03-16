import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)

    return req.then(res => {
        return res.data
    })
}

const get = (id) => {
    const req = axios.get(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const create = (newPerson) => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(res => res.data)
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const update = (person) => {
    const req = axios.put(`${baseUrl}/${person.id}`, person)
    return req.then(res => res.data)
}

export default { getAll, get, create, remove, update }