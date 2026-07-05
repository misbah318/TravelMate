const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const BOOKINGS_FILE = path.join(__dirname, "bookings.json");

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
    try {
        let data = fs.readFileSync(BOOKINGS_FILE, "utf8");

        let bookings;

        try {
            bookings = JSON.parse(data);
        } catch {
            bookings = [];
        }

        if (!Array.isArray(bookings)) {
            bookings = [];
        }

        res.json(bookings);

    } catch (error) {
        res.status(500).json([]);
    }
});

// Save booking
app.post("/api/bookings", (req, res) => {
    try {
        const newBooking = req.body;

        let data = fs.readFileSync(BOOKINGS_FILE, "utf8");

        let bookings;

        try {
            bookings = JSON.parse(data);
        } catch {
            bookings = [];
        }

        if (!Array.isArray(bookings)) {
            bookings = [];
        }

        newBooking.id = Date.now(); // IMPORTANT: ensure ID exists

        bookings.push(newBooking);

        fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

        res.json({ success: true });

    } catch (error) {
        res.status(500).json({ error: "Failed to save booking" });
    }
});

// Delete booking
app.delete("/api/bookings/:id", (req, res) => {
    try {
        const bookingId = Number(req.params.id);

        let data = fs.readFileSync(BOOKINGS_FILE, "utf8");

        let bookings;

        try {
            bookings = JSON.parse(data);
        } catch {
            bookings = [];
        }

        if (!Array.isArray(bookings)) {
            bookings = [];
        }

        bookings = bookings.filter(b => b.id !== bookingId);

        fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

        res.json({ success: true });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete booking" });
    }
});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});