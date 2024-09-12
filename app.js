const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

//Error Handling

//Import the dynamic route loader

const app = express();

// Global Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.DB_ENV === "development") {
  app.use(morgan("dev"));
}

//Use the dynamically loaded routes

//Handling Unhandle Routes

// Global Error Handling Middleware

module.exports = app;
