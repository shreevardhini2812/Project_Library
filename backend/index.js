import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { scheduleOverdueNotification } from "./controllers/borrowController.js";
import { notifyReservation } from "./controllers/reservationController.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


scheduleOverdueNotification();

setInterval(scheduleOverdueNotification, 1000 * 60 * 60 * 24);
setInterval(notifyReservation, 1000 * 60 * 60);
