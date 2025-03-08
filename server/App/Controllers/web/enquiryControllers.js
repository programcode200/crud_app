import enquiryModel from "../../Models/enquiry.model.js";

const enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  let enquiry = new enquiryModel({
    name,
    email,
    phone,
    message, //if both key and value name same, pass single name
  });

  enquiry
    .save()
    .then(() => {
      res.status(200).json({ status: 1, message: "Enquiry data inserted" });
    })
    .catch((err) => {
      res.send({ status: 0, error: err });
    });
};

const enquiryList = async (req, res) => {
  let enquiry = await enquiryModel.find();
  res.send({ status: 1, enquiry: enquiry });
};

const enquiryDelete = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.deleteOne({ _id: enId });
  res.send({ status: 1, enquiry, message: "Enuiry deleted" });
};

const enuiryEdit = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await enquiryModel.findOne({ _id: enId });
  res.send({ status: 1, enquiry });
};

const enquiryUpdate = async (req, res) => {
  let enquiryId = req.params.id;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name,
    email,
    phone,
    message,
  };

  let updateRes = await enquiryModel.updateOne({ _id: enquiryId }, updateObj);
  res.send({status:1, message: "successfull", updateRes});
};

export { enquiryInsert, enquiryList, enquiryDelete, enuiryEdit, enquiryUpdate };
