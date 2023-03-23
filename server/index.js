const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const cors = require("cors");
const { connection } = require('./Configs/Config');


app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.status(200).send('Welcome Paypal!!!');
});


httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (err) {
        console.log({ message: err.message });
    }
    console.log(`Server is running at port ${PORT}`);
});