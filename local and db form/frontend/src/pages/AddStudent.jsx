import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input, Textarea } from "../form";

const URL = "http://localhost:5000/students";

function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    address: "",
    dob: "",
  });
  const navigate = useNavigate();

  const updateField = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(URL, form);
    navigate("/students");
  };
  return (
    <StudentForm
      title="Student Information Form"
      form={form}
      updateField={updateField}
      onSubmit={handleSubmit}
      navigate={navigate}
      buttonLabel="Save"
    />
  );
}

function StudentForm({
  title,
  form,
  updateField,
  onSubmit,
  navigate,
  buttonLabel,
}) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card card-primary card-outline shadow-sm">
            <div className="card-header bg-white py-3">
              <h4 className="card-title fw-bold mb-0 text-primary">{title}</h4>
            </div>
            <form onSubmit={onSubmit}>
              <div className="card-body p-4">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Enter student name"
                  value={form.name}
                  onChange={updateField}
                  required
                />
                <Input
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={updateField}
                  required
                />
                <div className="mb-4">
                  <label className="fw-bold mb-2">Course</label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={updateField}
                    className="form-select"
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="mathematics">Mathematics</option>
                  </select>
                </div>
                <Textarea
                  label="Address"
                  name="address"
                  rows={3}
                  placeholder="Enter complete address"
                  value={form.address}
                  onChange={updateField}
                  required
                />
                <Input
                  type="date"
                  label="DOB"
                  name="dob"
                  value={form.dob}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="card-footer bg-light d-flex justify-content-end gap-2 p-3">
                <Button
                  type="button"
                  onClick={() => navigate("/students")}
                  theme="secondary"
                  label="Cancel"
                />
                <Button type="submit" theme="primary" label={buttonLabel} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { StudentForm };
export default AddStudent;
