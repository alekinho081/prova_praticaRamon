const express = require('express')
const app = express()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function addLog (req, res) {
    const {nome} = req.body
    const id = uuidv4()
    let mensagem = `${id} -- ${Date.now().toString()} -- ${nome}\n`
    fs.appendFileSync('./logs.txt', mensagem)
    res.status(201).send(`ID gerado: ${id}, mensagem adicionada ao arquivo de logs com sucesso`)
}


app.use(express.json())

app.post('/logs', addLog)


app.listen(8000, ()=> {
    console.log('servidor iniciado')
})