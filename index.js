const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
require('dotenv').config();
const port = process.env.PORT
const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);

app.get("/", (req, res) => {
    res.send({
        message: 'api is working',
    })
})

app.listen(port, async() => {
    try{
        await connection
        console.log('db is connected')
    } catch(e) {
        console.log(e);
    }
    console.log('Server is running on port number', port)
});
