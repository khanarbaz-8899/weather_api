import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <AuthProvider>
     
      <Router>
        <Navbar/>
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
            <ProtectedRoute><WeatherList /></ProtectedRoute>
          } />
          <Route path="/weather/add" element={
            <ProtectedRoute><WeatherForm /></ProtectedRoute>
          } />
          <Route path="/weather/edit/:id" element={
            <ProtectedRoute><WeatherForm /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
