import express from "express"
import { enquiryDelete, enquiryInsert, enquiryList, enquiryUpdate, enquiryEdit } from "../../Controllers/web/enquiryControllers.js";
let enquiryRoutes = express.Router();

enquiryRoutes.post("/insert", enquiryInsert)
enquiryRoutes.get("/view", enquiryList)
enquiryRoutes.delete("/delete/:id", enquiryDelete)
enquiryRoutes.get("/edit/:id", enquiryEdit)
enquiryRoutes.put("/update/:id", enquiryUpdate)

export default enquiryRoutes