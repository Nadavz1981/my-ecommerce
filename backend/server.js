import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World from Backend!");
});

app.listen(5000, () => {
    console.log("Backend server is running on http://localhost:5000");
});
