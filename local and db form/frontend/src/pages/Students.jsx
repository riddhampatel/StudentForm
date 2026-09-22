import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../form";

const URL = "http://localhost:5000/students";

function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const fetchStudents = async () =>
    setStudents((await axios.get(URL)).data);

  useEffect(() => {
    axios
      .get(URL)
      .then(({ data }) => setStudents(data))
      .catch(console.error);
  }, []);


  const handleDelete = async (studentId) => {
    await axios.delete(`${URL}/${studentId}`);
    await fetchStudents();
  };

  return (
    <div className="container py-5">
      <div className="card card-success card-outline shadow-sm">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center gap-2">
          <h4 className="card-title fw-bold mb-0 text-success">
            Student's DataTable
          </h4>
          <Button
            onClick={() => navigate("/students/add")}
            theme="info"
            label="Add new Student"
          />
        </div>
        <div className="card-body p-4 table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length ? (
                students.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.student_id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td className="text-uppercase">{student.course}</td>
                    <td>{student.address}</td>
                    <td>{student.dob.slice(0, 10)}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(`/students/edit/${student.student_id}`)
                        }
                        theme="warning"
                        size="sm"
                        label="Edit"
                      />
                      <Button
                        onClick={() => handleDelete(student.student_id)}
                        theme="danger"
                        size="sm"
                        label="Delete"
                        className="ms-2"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;
