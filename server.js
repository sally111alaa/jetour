const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ملف قاعدة البيانات
const DB_FILE = path.join(__dirname, "database.json");

// لو الملف مش موجود اعمليه
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, "[]", "utf-8");
}

// Get all clients
app.get("/queue", (req, res) => {
    const data = fs.readFileSync(DB_FILE);
    res.json(JSON.parse(data));
});

// Add new client
app.post("/queue", (req, res) => {
    const newClient = req.body;
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    data.push(newClient);
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Added" });
});

// Update client
app.put("/queue/:index", (req, res) => {
    const index = req.params.index;
    const updatedClient = req.body;
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    data[index] = updatedClient;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Updated" });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});