import React from "react";
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
