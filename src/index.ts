import express from 'express'
import router from './router.ts'

const app = express()

app.use(express.json())
app.use(router)

app.listen(3000, ()=>{
    console.log("App rodando...")
})