const express = require("express");
const router = require("./router");
const swaggerRouter = require("./swagger/swagger");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(swaggerRouter);
app.use(router); 

module.exports = app;
