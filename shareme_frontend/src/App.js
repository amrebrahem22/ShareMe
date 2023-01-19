import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./componenets";
import Home from "./containers/Home";
import { fetchUser } from "./utils/data";

function App() {
  useEffect(() => {
    const user = fetchUser();

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
