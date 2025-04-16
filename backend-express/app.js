const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express running on port ${PORT}`));
