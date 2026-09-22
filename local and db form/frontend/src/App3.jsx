import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App3() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddStudent />} />

        <Route path="/students" element={<Students />} />

        <Route path="/students/add" element={<AddStudent />} />

        <Route path="/students/edit/:studentId" element={<EditStudent />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App3;

