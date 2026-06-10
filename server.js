
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
const path = require("path");

dotenv.config();

const app = express();

// ─── CORS Configuration ─────────────────────────────────────────────────────
const allowedOrigins = [
  'https://strong-crepe-c85ee7.netlify.app',
  'http://localhost:3000',  // For local development
  'http://localhost:5000',  // Alternative local port
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(null, true); // Remove this line in production and use the line below
      // callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow cookies and authentication headers
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods'
  ],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Body parsing middleware (increase limit for image uploads)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
app.use("/uploads", express.static("uploads"));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// ─── Routes ─────────────────────────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// ─── Health Check / Test Routes ────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "AI Fashion Backend Running 🚀",
    cors: "Enabled",
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/test-cors", (req, res) => {
  res.json({
    message: "CORS is working!",
    receivedOrigin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// ─── MongoDB Connection ─────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// ─── Error Handling Middleware ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// ─── Start Server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 CORS enabled for: ${allowedOrigins.join(', ')}`);
  console.log(`🌐 Test URL: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});
