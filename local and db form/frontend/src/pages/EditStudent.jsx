import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { StudentForm } from "./AddStudent";

const URL = "http://localhost:5000/students";

function EditStudent() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    address: "",
    dob: "",
  });

  useEffect(() => {
    axios
      .get(`${URL}/${studentId}`)
      .then(({ data }) => {
        setForm({
          ...data,
          dob: data.dob ? data.dob.slice(0, 10) : "",
        });
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        navigate("/students");
      });
  }, [studentId, navigate]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/students/${studentId}`, form);
      navigate("/students");
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  return (
    <StudentForm
      title="Edit Student Information"
      form={form}
      updateField={updateField}
      onSubmit={handleSubmit}
      navigate={navigate}
      buttonLabel="Update"
    />
  );
}

export default EditStudent;
