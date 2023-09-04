import express from "express";
import cors from "cors";
import http from "http";
import { dbconnect } from "./src/config/config";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

const userRoutes = require("./src/routes/userRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

app.use('/user', userRoutes);
app.use('/adminRoutes', adminRoutes);
dbconnect();

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
