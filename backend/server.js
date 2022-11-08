require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/db");
const collegeRoutes = require("./routes/college.routes");
const placementRoutes = require("./routes/placement.routes");
const adminRoutes = require("./routes/admin.routes");
const contactRoutes = require("./routes/contact.routes");

// port
const PORT = process.env.PORT || 5000;

// create express app
const app = express();
app.use(express.json());
const corsOptions ={
    origin:'https://dataplace.netlify.app', 
}
app.use(cors(corsOptions));

// connect to db
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

// main route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the DataPlace Application." });
});

// college routes
app.use("/api/college", collegeRoutes);

// placement routes
app.use("/api/placement", placementRoutes);

// admin routes
app.use("/api/admin", adminRoutes);

// contact routes
app.use("/api/contact", contactRoutes);

// run server
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
