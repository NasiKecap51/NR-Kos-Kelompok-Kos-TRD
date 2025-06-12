import express from "express";
import {
  getBookings,
  createBooking,
  updateStatusBooking,
} from "../controller/pemesananController";
import {
  verifyAddBooking,
  verifyEditStatus,
} from "../middleware/pemesananValidation";
import { verifyRole, verifyToken } from "../middleware/authorization";

const app = express();
app.use(express.json());

// GET all bookings - hanya untuk AnakKost dan BapakKost
app.get(
  "/",
  [verifyToken, verifyRole(["AnakKost", "BapakKost"])],
  getBookings
);

// POST create new booking - hanya untuk AnakKost dan BapakKost
app.post(
  "/",
  [verifyToken, verifyRole(["AnakKost", "BapakKost"]), verifyAddBooking],
  createBooking
);

// PUT update status booking - hanya untuk BapakKost
app.put(
  "/:id",
  [verifyToken, verifyRole(["BapakKost"]), verifyEditStatus],
  updateStatusBooking
);

export default app;
