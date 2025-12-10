import express from "express";
import cors from 'cors'
import 'dotenv/config'

// initialize express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("API is working");
});


// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
});