const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db.config");
const userRoutes = require("./route/user.route");
const propertyRoutes = require("./route/property.route");
const reviewRoutes = require("./route/reviews.route");
const reservationRoutes = require("./route/reservation.route");
const dotenv = require("dotenv");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/", propertyRoutes);
app.use("/", reviewRoutes);
app.use("/", reservationRoutes);

dotenv.config();

require("./model/association");
sequelize.sync();

app.listen(5000, () => {
  console.log("server running on 5000");
});
