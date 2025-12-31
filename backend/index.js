const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
