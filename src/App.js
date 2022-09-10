/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Logo from "./components/Logo";
import { Landing, Error, Register, ProtectedRoute } from "./Pages";

import {
  Profile,
  AddJob,
  AllJobs,
  Stats,
  SharedLayout,
} from "./Pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Logo /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          ///////////////////////////////////////////
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        ///////////////////////////////////////////
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
