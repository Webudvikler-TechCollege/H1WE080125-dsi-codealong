import express from 'express'
import dotenv from 'dotenv'
import { carRouter } from './routes/carRoutes.js'

dotenv.config()

const port = process.env.SERVERPORT || 3000
const app = express()

// Kalder root route med request og response objekt
app.get('/', (req, res) => {
    res.send('Hej verden!')
})

app.use("/cars", carRouter)

app.use((req, res) => {
    res.send('404 - kan ikke finde siden du leder efter.')
})


app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`)
})