const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoDB = require('./database/MongoDB');

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// database
MongoDB();

// routes
const userRouter = require('./routes/user');

app.use('/api/user', userRouter);

app.listen(PORT, () => console.log("server running..."));