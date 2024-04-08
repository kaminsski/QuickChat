const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

dotenv.config()

const connect = require("./config/dbmongo")

const PORT = process.env.PORT

const app= express()

app.use(cors())
app.use('/Images', express.static(path.join(__dirname, 'Images')));

app.use(express.json())

app.use("/api/messages", require("./routes/messageRoute"))
app.use("/api/user", require("./routes/userRoute"))

connect()

app.listen(PORT, ()=>{console.log(`server port : ${PORT}`)})
