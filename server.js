const express = require('express')
const app = express()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function addLog(req, res) {
    const { nome } = req.body
    const id = uuidv4()
    const d = new Date()
    let mensagem = `${id} -- ${d.getFullYear()}-${d.getMonth()}-${d.getDay()}  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} -- ${nome}\n`
    fs.appendFileSync('./logs.txt', mensagem)
    res.status(201).send(`ID gerado: ${id}, mensagem adicionada ao arquivo de logs com sucesso`)
}

function getLog(req, res) {
    let { id } = req.params
    const data = fs.readFileSync('./logs.txt').toString()
    const mensagem = data.split('\n')
    let logs = mensagem.map(e => e.split(' '))
    let mensagemLog 

    let uou = () => {
        for (let i = 0; i < logs.length; i++) {
            if (logs[i].includes(id)) {
                mensagemLog = logs[i].join(' ')
                return true
            } else {
                
                console.log('Nada encontrado ainda')
            }

        }
        return false
    }
    if (uou()) {
        res.status(200).send(`Log encontrado: ${mensagemLog} `)
    } else {
        res.status(404).send('ID não encontrado')
    }

}

app.use(express.json())

app.post('/logs', addLog)
app.get('/logs/:id', getLog)

app.listen(8000, () => {
    console.log('servidor iniciado')
})


