import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import enquiryRoutes from "./App/Routes/web/enquiryRoute.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors(
  {
    origin: "https://crud-app-psi-navy.vercel.app/",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], 
  }
))

app.options("*", cors()); // ✅ Allow all preflight requests

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


//Routes
app.use("/api/website/enquiry", enquiryRoutes);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("connected to db");
    app.listen(8000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
