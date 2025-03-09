import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const allowedOrigins = "https://crud-app-psi-navy.vercel.app";

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "Content-Type,Authorization", // ✅ Allowed headers
  })
);

app.options("*", cors()); // ✅ Allow all preflight requests

console.log("Routes loaded:");
console.log(enquiryRoutes.stack.map((r) => r.route.path));

app.use(express.json());

// ✅ Test Route - Check if server is running
app.get("/", (req, res) => {
  res.send("Server is running on Vercel!");
});

import enquiryRoutes from "./Routes/web/enquiryRoute.js";

// ✅ Correct API Route
app.use("/api", enquiryRoutes);

// ✅ Fix for Vercel (Remove app.listen)
mongoose
  .connect(`${process.env.DBURL}/test`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on http://localhost:${PORT}`);
// });

export default app; // ✅ Correct export for Vercel
