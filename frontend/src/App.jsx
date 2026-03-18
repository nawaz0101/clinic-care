//Main application routing

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layout
import MainLayout from "./layouts/MainLayout";

//css
import "./index.css";

//Pages

import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Appoitment from "./pages/Appointment";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import AdminDoctors from "./pages/AdminDoctors";
import AdminServices from "./pages/AdminServices";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointment" element={<Appoitment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element=<ProtectedRoute>{<ChangePassword />}</ProtectedRoute>
          />
          <Route
            path="/admin-doctors"
            element={
              <ProtectedRoute>
                <AdminDoctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-services"
            element={
              <ProtectedRoute>
                <AdminServices />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
