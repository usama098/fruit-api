require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const fruits = require('./fruits.json')
const logger = require('./logger')

//middleware goes first
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.send("Welcome to the fruit API")
})

app.get('/fruits', (req, res) => {
    res.send(fruits)
})

app.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const ff = fruits.filter((f) => f.name.toLowerCase() == name)

    //Turnery operator
    //CONDITION ? TRUE : FALSE
    ff.length === 0 
    ? res.status(404).send("the fruit doesn't exist") 
    : res.send(ff[0]) 
})

app.post('/fruits', (req, res) => {
    if (!req.body || !req.body.name){
        return res.status(400).send("Fruit name is required")
    }

    try{
        const fruit = fruits.find((f) => f.name.toLowerCase() === req.body.name.toLowerCase())
        if(fruit != undefined){
            return res.status(409).send("That fruit exist")
        }

        const ids = fruits.map((f) => f.id)
        let maxID = Math.max(...ids)


        req.body.id = maxID + 1
        fruits.push(req.body)
        res.status(201).send("Fruit Created")

    }catch (e){
        console.error(e)
        res.status(500).send("An error has happened")
    }

})

app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase()
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() === name)
    if (fruitIndex === -1){
        res.status(404).send("No fruit by that name")
    }else{
        fruits.splice(fruitIndex, 1)
        res.sendStatus(204)
    }
})

app.patch("/fruits/:name", (req, res) => {
    const fruit = fruits.find((f) => f.name.toLowerCase() == req.params.name.toLowerCase())
    const newFruitName = req.body.name

    if(fruit == undefined){
        res.status(404).send("No fruit found by that name")
    }else{
        fruit.name = newFruitName
        res.status(200).send(fruit)
    }

})

app.listen(port, () => { 
    console.log(`Server listening on port ${port}`)
})