/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verify from "./pages/verify/Verify";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
