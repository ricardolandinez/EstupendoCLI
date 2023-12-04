const request = async (url, body) => {
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data =  await res.json()
    return data
}

const requestFile = async (url, body) => {
    const res = await fetch(url, {
        method: "POST",
        body: "",
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    const data =  await res.json()
    return data
}
export { request, requestFile }
