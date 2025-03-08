import express from "express"
import { enquiryDelete, enquiryInsert, enquiryList, enquiryUpdate, enuiryEdit } from "../../Controllers/web/enquiryControllers.js";
let enquiryRoutes = express.Router();

enquiryRoutes.post("/insert", enquiryInsert)
enquiryRoutes.get("/view", enquiryList)
enquiryRoutes.delete("/delete/:id", enquiryDelete)
enquiryRoutes.get("/edit/:id", enuiryEdit)
enquiryRoutes.put("/update/:id", enquiryUpdate)

export default enquiryRoutes