require("dotenv/config")
require("./db.js")

const port = process.env.PORT || 3000

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})