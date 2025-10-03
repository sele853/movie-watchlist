import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//connect to mongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server is running on ${PORT}`))