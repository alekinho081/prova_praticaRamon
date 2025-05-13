const express = require('express')
const app = express()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function addLog (req, res) {
    const {nome} = req.body
    const id = uuidv4()
    const d = new Date()
    let mensagem = `${id} -- ${d.getFullYear()}-${d.getMonth()}-${d.getDay()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} -- ${nome}\n`
    fs.appendFileSync('./logs.txt', mensagem)
    res.status(201).send(`ID gerado: ${id}, mensagem adicionada ao arquivo de logs com sucesso`)
}

function getLog(req, res) {
    const id = req.param
    const data = fs.readFileSync('./logs.txt').toString()
    const mensagem = data.split('\n')
    
}

app.use(express.json())

app.post('/logs', addLog)
app.get('/logs/:id', getLog)

app.listen(8000, ()=> {
    console.log('servidor iniciado')
})


