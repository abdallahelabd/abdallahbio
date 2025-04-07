import React from "react";
import { Routes, Route } from "react-router-dom";
import BioSite from "./BioSite";
import AdminChatPage from "./AdminChatPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BioSite />} />
      <Route path="/admin" element={<AdminChatPage />} />
    </Routes>
  );
}
