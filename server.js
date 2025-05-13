const express = require('express')
const app = express()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

function addLog(req, res) {
    try {
        const { nome } = req.body
        const id = uuidv4()
        const data = new Date()
        let mensagem = `${id} -- ${data.getFullYear()}-${data.getMonth()}-${data.getDay()}  ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} -- ${nome}\n`
        fs.appendFileSync('./logs.txt', mensagem)
        res.status(201).send(`ID gerado: ${id}, mensagem adicionada ao arquivo de logs com sucesso`)
    } catch (err) {
        res.status(500).send(`Erro encontrado ${err}`)
    }
}

function getLog(req, res) {
    try {
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
    } catch (err) {
        res.status(500).send(`Erro detectado ${err}`)
    }

}

app.use(express.json())

app.post('/logs', addLog)
app.get('/logs/:id', getLog)

app.listen(8000, () => {
    console.log('servidor iniciado')
})