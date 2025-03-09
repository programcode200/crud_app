import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import enquiryRoutes from "./App/Routes/web/enquiryRoute.js";
import { DB_NAME } from "./constant.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://crud-app-psi-navy.vercel.app", // 👈 Allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors()); // ✅ Allow all preflight requests



// ✅ Test Route - Check if server is running
app.get("/", (req, res) => {
  res.send("Server is running on Vercel!");
});

// ✅ Correct API Route
app.use("/api/enquiry", enquiryRoutes);

// ✅ Fix for Vercel (Remove app.listen)
mongoose.connect(`${process.env.DBURL}/${DB_NAME}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

export default app; // ✅ Correct export for Vercel
