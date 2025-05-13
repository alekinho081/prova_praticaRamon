const express = require('express')
const app = express()
const fs = require('fs')


function addLog (req, res) {
    const {nome} = req.body
    const id = uuidv4()
    let mensagem = `${id} -- ${Date.now().toString()} -- ${nome}`
    fs.appendFileSync('../logs.txt', mensagem)
    res.status(201).send(`ID gerado: ${id}, mensagem adicionada ao arquivo de logs com sucesso`)
}

app.listen(8000, ()=> {
    console.log('servidor iniciado')
})