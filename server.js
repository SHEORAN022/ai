
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use("/uploads", express.static("uploads"));

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const aiRoutes = require("./routes/aiRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/ai", aiRoutes);

// // MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log("MongoDB Error:", err));

// // Test Route
// app.get("/", (req, res) => {
//   res.send("AI Fashion Backend Running 🚀");
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "https://frontrepoai.vercel.app",
      "http://localhost:3000",
      "https://frontrepoai.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("AI Fashion Backend Running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
