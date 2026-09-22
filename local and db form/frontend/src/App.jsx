import { useState } from "react";
import { Input, Button, Textarea } from "./form";
import axios from "axios";
function App3() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);

  const [savedName, setSavedName] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedCourse, setSavedCourse] = useState("");
  const [savedAddress, setSavedAddress] = useState("");
  const [savedDob, setSavedDob] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/students", {
        name,
        email,
        course,
        address,
        dob,
      });
      console.log(response.data);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("course", course);
      localStorage.setItem("address", address);
      localStorage.setItem("dob", dob);

      setSavedName(name);
      setSavedEmail(email);
      setSavedCourse(course);
      setSavedAddress(address);
      setSavedDob(dob);

      setIsSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container py-5">
      {isSubmit ? (
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card card-success card-outline shadow-sm">
              <div className="card-header bg-white py-3">
                <h4 className="card-title fw-bold mb-0 text-success">
                  <i className="bi bi-check-circle-fill me-2"></i> Student
                  Information
                </h4>
                <div className="card-tools">
                  <Button 
                  onClick={() => setIsSubmit(false)} 
                  theme="warning" 
                  label="Edit" 
                />
                </div>
                 

              </div>
              <div className="card-body p-4">
                <div className="mb-3">
                  <strong>Name:</strong>
                  <p className="text-muted">{savedName}</p>
                </div>
                <div className="mb-3">
                  <strong>Email Address:</strong>
                  <p className="text-muted">{savedEmail}</p>
                </div>
                <div className="mb-3">
                  <strong>Course:</strong>
                  <p className="text-muted text-uppercase">{savedCourse}</p>
                </div>
                <div className="mb-3">
                  <strong>Address:</strong>
                  <p className="text-muted">{savedAddress}</p>
                </div>
                <div className="mb-3">
                  <strong>Date of Birth:</strong>
                  <p className="text-muted">{savedDob}</p>
                </div>
                <div className="card-footer bg-light d-flex justify-content-end p-3">
                  <Button
                    onClick={() => setIsSubmit(false)}
                    theme="secondary"
                    label="Back to Form"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card card-primary card-outline shadow-sm">
              <div className="card-header bg-white py-3">
                <h4 className="card-title fw-bold mb-0 text-primary">
                  <i className="bi bi-person-lines-fill me-2"></i> Student
                  Information Form
                </h4>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body p-4">
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="Enter student name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    label="Email Address"
                    name="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="mb-4">
                    <label className="fw-bold mb-2">Course</label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full border p-2 rounded form-select font-medium"
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <Input
                    type="date"
                    label="DOB"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
                <div className="card-footer bg-light d-flex justify-content-end p-3">
                  <Button type="submit" theme="primary" label="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App3;
