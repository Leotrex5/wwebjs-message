import { Router } from "express";
import path from "path";
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal'

const router = Router()

router.get('/', (req, res) => {
    res.sendFile(path.resolve('src/views/index.html'))
})

const startBot = async () => {

    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            executablePath: path.resolve("chrome-headless-shell/linux-120.0.6098.0/chrome-headless-shell-linux64/chrome-headless-shell")
        }
    })

    client.initialize()

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true })
    })

    client.on('ready', () => {
        console.log("Bot pronto!")
    })

    router.post('/send-message', async (req, res) => {
        try {
            const list = req.body
            const numbers = list.to.split(',')
            numbers.forEach(number => {
                client.sendMessage(number + '@c.us', list.message)
            });
            res.send("Mensagens enviadas com sucesso!")
        }
        catch {
            res.status(400).send("Mensagens não enviadas!")
            throw new Error("Algo inesperado aconteceu")
        }
    })
}

startBot()

export default router