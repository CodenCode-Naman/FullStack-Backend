const express = require("express")
const app = express()
const port = 8001
const router = require("./routers/publicData.route.js")
const cors= require("cors")

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use("/",router)
 
app.listen(port, () => {
    console.log(`backend listening on port ${port}`)
})