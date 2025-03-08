import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import enquiryRoutes from "./App/Routes/web/enquiryRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); // ✅ Fix CORS

// ✅ Test Route - Check if server is running
app.get("/", (req, res) => {
  res.send("Server is running on Vercel!");
});

// ✅ Correct API Route
app.use("/api/website/enquiry", enquiryRoutes);

// ✅ Fix for Vercel (Remove app.listen)
mongoose.connect(process.env.DBURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

export default app; // ✅ Correct export for Vercel
