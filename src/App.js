import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CardList from "./pages/CardList";
import AddCard from "./pages/AddCard";
import EditCard from "./pages/EditCard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/cards" element={<CardList />}/>
        <Route path="/cards/new" element={<ProtectedRoute><AddCard /></ProtectedRoute>}/>
        <Route path="/cards/:id/edit" element={<ProtectedRoute><EditCard/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}



