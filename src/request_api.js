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
export { request }
