import React from "react";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";
import Create from "./pages/Assessment/Create";
import Assessments from "./pages/Assessment/Assessments";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/manage" element={<Home />} />

        <Route path="/manage/assessments" element={<Assessments />} />
        <Route path="/manage/assessments/create" element={<Create />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
