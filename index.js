const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mainRoutes = require("./routes/main");
const salesRoutes = require("./routes/sales");
const managementRoutes = require("./routes/management");
const clientRoutes = require("./routes/client");
const User = require("./models/user");

// Configuration
dotenv.config();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Admin Dashboard API.</h1>");
});

app.use("/api/main", mainRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Connect to DB & Server running on port ${port}`);
    });
  });
