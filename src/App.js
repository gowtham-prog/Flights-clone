import React from "react";
import {Routes, Route} from "react-router-dom";
import Flights from "./pages/flights";

export default function App() {
  return (
    <Routes>
      <Route path="/flights" element={<Flights />} />
    </Routes>
  );
}