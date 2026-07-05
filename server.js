const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static(__dirname));

let bookings = [];

app.post("/api/book", (req, res) => {
    bookings.push(req.body);
    res.json({ success: true });
});

app.post("/api/login", (req, res) => {
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});