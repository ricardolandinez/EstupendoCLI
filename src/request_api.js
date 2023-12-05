import axios from "axios"

const request = async (url, body) => {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data
}

const requestFile = async (url, fd) => {
    const {data} = await axios.post(url, fd, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}
export { request, requestFile }
