import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/dbConfig";
import { setRoutes } from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
connectDB();

// Default route for root path
app.get("/", (req, res) => {
    res.send("Welcome to the Login Backend API");
});

// Set up routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
