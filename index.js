import express from 'express'
import { carRouter } from './routes/carRoutes.js'

const port = process.env.SERVERPORT || 3000

const app = express()
app.use(express.urlencoded({ extended: true }));

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