// // const path = require("path");
// // require("dotenv").config({ path: path.join(__dirname, ".env") });

// // const express = require("express");
// // const mongoose = require("mongoose");
// // const todoRoutes = require("./routes/todoRoutes");
// // console.log("SERVER FILE LOADED");
// // // require("dotenv").config();
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const path = require("path");
// // // const todoRoutes = require("./routes/todoRoutes");

// // const app = express();
// // app.use((req, res, next) => {
// //   console.log("REQUEST RECEIVED:", req.method, req.url);
// //   next();
// // });
// // app.use(express.json());

// // // Log every API request: method, url, status, time taken, and body for writes
// // app.use("/api", (req, res, next) => {
// //   const start = Date.now();
// //   res.on("finish", () => {
// //     const body = ["POST", "PUT"].includes(req.method)
// //       ? ` ${JSON.stringify(req.body)}`
// //       : "";
// //     console.log(
// //       `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms${body}`
// //     );
// //   });
// //   next();
// // });

// // app.get("/test", (req, res) => {
// //   res.json({ message: "Server is working!" });
// // });
// // // API routes
// // app.use("/api/todos", todoRoutes);

// // // Serve the React build (used in production)
// // // const buildPath = path.join(__dirname, "../client/dist");
// // // app.use(express.static(buildPath));
// // // app.get("/{*splat}", (req, res) => {
// // //   res.sendFile(path.join(buildPath, "index.html"));
// // // });

// // const PORT = process.env.PORT || 5001;

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log("Connected to MongoDB");
// //     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// //   })
// //   .catch((err) => console.error("MongoDB connection failed:", err.message));
// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, ".env") });

// const express = require("express");
// const mongoose = require("mongoose");
// const todoRoutes = require("./routes/todoRoutes");

// const app = express();

// app.use(express.json());

// // Simple request logger
// app.use((req, res, next) => {
//   console.log("REQUEST:", req.method, req.url);
//   next();
// });

// // API routes
// app.use("/api/todos", todoRoutes);
// // app.get("/api/todos", (req, res) => {
// //   console.log("DIRECT API ROUTE REACHED");
// //   res.json([]);
// // });
// // Temporary test route
// app.get("/test", (req, res) => {
//   res.json({ message: "Server is working!" });
// });

// const PORT = process.env.PORT || 5001;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed:", err.message);
//   });
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// API routes
app.use("/api/todos", todoRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Serve React/Vite frontend in production
const buildPath = path.join(__dirname, "../client/dist");

app.use(express.static(buildPath));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });