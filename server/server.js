const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const connectDB = require('./config/db/dbConnection');

const userRoutes = require('./routes/user.routes');

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

//router
app.use('/api', userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));