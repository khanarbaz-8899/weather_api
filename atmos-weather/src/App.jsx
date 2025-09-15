import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import WeatherList from "./pages/WeatherList";
import WeatherForm from "./pages/WeatherForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UsersList from "./pages/UsersList"; // ✅ import Users page
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import WeatherEdit from "./pages/WeatherEdit";
import UserEdit from "./pages/UserEdit";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/weather" element={
           <WeatherList />
          } />
          <Route path="/records" element={
            <Navigate to="/weather" replace />
          } />
          <Route path="/form" element={
            <Navigate to="/weather/add" replace />
          } />
          <Route path="/weather/edit/:id" element={
            <ProtectedRoute><WeatherEdit /></ProtectedRoute>
          } />
          <Route path="/weather/add" element={
            <ProtectedRoute><WeatherForm /></ProtectedRoute>
          } />

          {/* ✅ Admin-only Users route */}
          <Route path="/users" element={
            <ProtectedRoute><UsersList /></ProtectedRoute>
          } />
            <Route path="/users/edit/:_id" element={
            <ProtectedRoute><UserEdit /></ProtectedRoute>
          } />

          {/* Optional: catch-all 404 */}
          <Route path="*" element={<h1 className="p-10 text-2xl">404 - Page Not Found</h1>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
