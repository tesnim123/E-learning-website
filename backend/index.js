const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");
require('dotenv').config();


const app = express();
app.use(cors());

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);

app.listen(process.env.BACK_PORT, () => console.log("Server running on port ",process.env.BACK_PORT));
