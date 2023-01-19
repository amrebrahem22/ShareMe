import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./componenets";
import Home from "./containers/Home";

function App() {
  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

    if (!user) Navigate("/login");
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
