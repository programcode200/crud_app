import { Button, Textarea, Label, TextInput } from "flowbite-react";
import EnquiryList from "./enuiry/EnquiryList";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {server_url} from "../constants.js"

export default function Enquiry() {
  const [enquiryData, setEnquiryData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();

    // let formData = {
    //   name: e.target.name.value,
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   message: e.target.message.value,
    // };

    if (formData._id) {
      //update
      axios
        .put(
          `${server_url}/update/${formData._id}`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry updated successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",

          });
          getEnquiry()
        });
    } else {
      //insert
      axios
        .post(`${server_url}/insert`, formData)
        .then((res) => {
          console.log(res);
          toast.success("Enquiry saved successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          getEnquiry();
        });
    }
  };

  const getEnquiry = () => {
    axios
      .get(`${server_url}/view`)
      .then((res) => {
        return res.data;
      })
      .then((eData) => {
        if (eData.status) {
          setEnquiryData(eData.enquiry);
        }
      });
  };

  const getValue = (e) => {
    let inputName = e.target.name; //name,email,phone,msg
    let inputValue = e.target.value;
    console.log(typeof(inputName));
    console.log(typeof(inputValue));
    console.log(inputValue);

    let newData = { ...formData };

    newData[inputName] = inputValue;
    setFormData(newData);
  };

  useEffect(() => {
    getEnquiry();
  }, []);


  return (
    <div>
      <ToastContainer />
      <h1 className="text-[35px] py-5 text-center font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-6">
        <div className="bg-gray-300 p-4 mx-4">
          <h2 className="text-[20px] font-bold ">Enquiry Form</h2>

          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" value="Your name" />
              <TextInput
                onChange={getValue}
                value={formData.name}
                type="text"
                name="name"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email" value="Your email" />
              <TextInput
                onChange={getValue}
                value={formData.email}
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="phone" value="Your phone" />
              <TextInput
                onChange={getValue}
                value={formData.phone}
                type="text"
                name="phone"
                placeholder="Enter phone"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message" value="Your message" />
              <Textarea
                onChange={getValue}
                value={formData.message}
                name="message"
                placeholder="Leave a message..."
                required
                rows={3}
              />
            </div>
            <div>
              {}
              <Button type="submit" className="w-[100%]">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList
          data={enquiryData}
          getEnquiry={getEnquiry}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
