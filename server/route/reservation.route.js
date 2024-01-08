const express = require("express");
const router = express.Router();
const reservation = require("../controller/reservation.controller");

router.post(
  "/user/:userId/property/:propertyId/reservation",
  reservation.createReservation
);

router.get(
  "/host/property/:propertyId/reservation",
  reservation.getReservationsForProperty
);

router.get("/host/:hostId/reservations", reservation.getReservationsForHost);
module.exports = router;
