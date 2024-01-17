const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("I am express")
}) 

app.get('/chickens', (req, res) => {
    res.send("I am alot of chicken")
}) 

app.get("/chickens/:name", (req, res) => {
    //res.send(req.params)
    res.send(req.query)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})