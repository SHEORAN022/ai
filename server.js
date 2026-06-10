// // const express = require("express");
// // const cors = require("cors");
// // const dotenv = require("dotenv");

// // const connectDB = require("./config/db");

// // dotenv.config();

// // // MongoDB Connect
// // connectDB();

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Static Folder
// // app.use(
// //   "/models",
// //   express.static("public/models")
// // );

// // app.use(
// //   "/uploads",
// //   express.static("uploads")
// // );

// // // Routes
// // app.use(
// //   "/api/auth",
// //   require("./routes/authRoutes")
// // );

// // // AI Routes 🔥
// // app.use(
// //   "/api/ai",
// //   require("./routes/aiRoutes")
// // );

// // // Test Route
// // app.get("/", (req, res) => {
// //   res.send(
// //     "AI Fashion Backend Running 🚀"
// //   );
// // });

// // // Server
// // const PORT =
// //   process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(
// //     `Server running on port ${PORT}`
// //   );
// // });
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();

// const app = express();

// // MIDDLEWARE
// app.use(express.json());
// app.use(cors());

// // ROUTES
// app.use(
//   "/api/auth",
//   require("./routes/authRoutes")
// );
// app.use(
//   "/api/ai",
//   require("./routes/aiRoutes")
//  );

// // DATABASE
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // SERVER
// const PORT =
//   process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(
//     `Server running on port ${PORT}`
//   );
// });
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("AI Fashion Backend Running 🚀");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});