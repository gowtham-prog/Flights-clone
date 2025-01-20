import React from "react";
import { Route, Routes } from "react-router-dom";
import Flights from "./pages/flights";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Flights />} />
    </Routes>
  );
}