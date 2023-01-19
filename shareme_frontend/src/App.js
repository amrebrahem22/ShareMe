import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./componenets";
import Home from "./containers/Home";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (!User) navigate("/login");
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
