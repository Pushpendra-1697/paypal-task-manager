const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const cors = require("cors");
const { connection } = require('./Configs/Config');
const { UserRouter } = require('./Routes/user.route');
const { dashboardRouter } = require('./Routes/dashboard.route');

app.use(cors());
app.use(express.json());
app.use(express.text());

app.get('/', async (req, res) => {
    res.status(200).send('Welcome Paypal!!!');
});

app.use('/', UserRouter);
app.use('/dashboard', dashboardRouter);


httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (err) {
        console.log({ message: err.message });
    }
    console.log(`Server is running at port ${PORT}`);
});