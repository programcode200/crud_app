import enquiryModel from "../../Models/enquiry.model.js";


// const enquiryInsert = async(req, res) => {
//   let { name, email, phone, message } = req.body;

//   let enquiry = new enquiryModel({
//     name,
//     email,
//     phone,
//     message, //if both key and value name same, pass single name
//   });

//   await enquiry
//     .save()
//     .then(() => {
//       res.status(200).json({ status: 1, message: "Enquiry data inserted" });
//     })
//     .catch((err) => {
//       res.send({ status: 0, error: err });
//     });
// };


const enquiryInsert = async (req, res) => {
  try {
    let { name, email, phone, message } = req.body;

    let enquiry = new enquiryModel({ name, email, phone, message });

    await enquiry.save();

    res.status(200).json({ status: 1, message: "Enquiry data inserted" });
  } catch (err) {
    res.status(500).json({ status: 0, error: err.message || "Server error" });
  }
};


// const enquiryList = async (req, res) => {
//   let enquiry = await enquiryModel.find();
//   res.send({ status: 1, enquiry: enquiry });
// };

// const enquiryDelete = async (req, res) => {
//   let enId = req.params.id;
//   let enquiry = await enquiryModel.deleteOne({ _id: enId });
//   res.send({ status: 1, enquiry, message: "Enuiry deleted" });
// };

// const enquiryEdit = async (req, res) => {
//   let enId = req.params.id;
//   let enquiry = await enquiryModel.findOne({ _id: enId });
//   res.send({ status: 1, enquiry });
// };

// const enquiryUpdate = async (req, res) => {
//   let enquiryId = req.params.id;
//   let { name, email, phone, message } = req.body;
//   let updateObj = {
//     name,
//     email,
//     phone,
//     message,
//   };

//   let updateRes = await enquiryModel.updateOne({ _id: enquiryId }, updateObj);
//   res.send({status:1, message: "successfull", updateRes});
// };

// export { enquiryInsert, enquiryList, enquiryDelete, enquiryEdit, enquiryUpdate };


const enquiryList = async (req, res) => {
  try {
    const enquiries = await enquiryModel.find();
    res.status(200).json({ status: 1, enquiries });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message || "Server error" });
  }
};

const enquiryDelete = async (req, res) => {
  try {
    const enId = req.params.id;
    const deletedEnquiry = await enquiryModel.deleteOne({ _id: enId });

    if (deletedEnquiry.deletedCount === 0) {
      return res.status(404).json({ status: 0, message: "Enquiry not found" });
    }

    res.status(200).json({ status: 1, message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message || "Server error" });
  }
};

const enquiryEdit = async (req, res) => {
  try {
    const enId = req.params.id;
    const enquiry = await enquiryModel.findById(enId);

    if (!enquiry) {
      return res.status(404).json({ status: 0, message: "Enquiry not found" });
    }

    res.status(200).json({ status: 1, enquiry });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message || "Server error" });
  }
};

const enquiryUpdate = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const { name, email, phone, message } = req.body;

    const updateRes = await enquiryModel.updateOne(
      { _id: enquiryId },
      { $set: { name, email, phone, message } }
    );

    if (updateRes.matchedCount === 0) {
      return res.status(404).json({ status: 0, message: "Enquiry not found" });
    }

    res.status(200).json({ status: 1, message: "Update successful" });
  } catch (error) {
    res.status(500).json({ status: 0, error: error.message || "Server error" });
  }
};

export { enquiryInsert, enquiryList, enquiryDelete, enquiryEdit, enquiryUpdate };
