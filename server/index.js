import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import enquiryRoutes from "./App/Routes/web/enquiryRoute.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.get('/api/enquiry', (req, res) => {
  res.json({ message: "API is working!" });
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
