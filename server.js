import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Event from "./event/Event.js";

require("dotenv").config();
const dbURI = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect(
    "mongodb://waniyahk1234_db_user:yby8QtBWiHW247NU@ac-jznajl6-shard-00-00.chxxjov.mongodb.net:27017,ac-jznajl6-shard-00-01.chxxjov.mongodb.net:27017,ac-jznajl6-shard-00-02.chxxjov.mongodb.net:27017/?ssl=true&replicaSet=atlas-dpwepn-shard-0&authSource=admin&appName=Cluster0",
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role: role || "user" });
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ error: "Username already exists or invalid data" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({
      message: "Login successful",
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// Event Routes
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: "Failed to create event" });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
