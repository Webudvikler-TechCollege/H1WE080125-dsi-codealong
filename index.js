import express from 'express'
import { carRouter } from './routes/carRoutes.js'

const port = 4000
const app = express()

// Kalder root route med request og response objekt
app.get('/', (req, res) => {
    res.send('Hej verden!')
    console.log(req)
})

app.use("/cars", carRouter)


app.listen(port, () => {
    console.log(`Server kører på http://localhost:${port}`)
})