import axios from "axios";
import { Table } from "flowbite-react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {server_url} from "../../constants"


export default function EnquiryList({ data, getEnquiry, Swal, setFormData }) {
  
  const deleteRow = (id) => {
    Swal.fire({
      title: "Do you want to delete the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${server_url}/delete/${id}`)
          .then(() => {
            getEnquiry();
            toast.success("Enquiry deleted successfully");
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const editData = (editId) => {
    axios
      .get(`${server_url}/edit/${editId}`)
      .then((res) => {
        console.log(res.data.enquiry);
        setFormData(res.data.enquiry);
      });
  };

  return (
    <div className="bg-gray-300 p-4">
      <h2 className="text-[20px] font-bold mb-3">Enquiry List</h2>

      <div className="overflow-x-auto ">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr no</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span>Delete</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>{item.message}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => editData(item._id)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => deleteRow(item._id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Data Not Found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

// Add PropTypes validation
EnquiryList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired, // Enforce 'data' to be an array of specific objects
};
