import React from "react";

import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Error, Register, Dashboard } from "./Pages";
import Logo from "./components/Logo";

const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
