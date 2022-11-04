import React from "react";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";
import CreateAssessment from "./pages/Assessment/CreateAssessment";
import CreateFrequency from "./pages/Frequency/CreateFrequency";
import CreateWeight from "./pages/Weight/CreateWeight";
import Assessments from "./pages/Assessment/Assessments";
import Frequencies from "./pages/Frequency/Frequencies";
import Weights from "./pages/Weight/Weights";
import Distances from "./pages/Distance/Distances";
import CreateDistance from "./pages/Distance/CreateDistance";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/manage" element={<Home />} />

        <Route path="/manage/assessments" element={<Assessments />} />
        <Route path="/manage/assessments/create" element={<CreateAssessment />} />
        
        <Route path="/manage/frequencies" element={<Frequencies />} />
        <Route path="/manage/frequencies/create" element={<CreateFrequency />} />

        <Route path="/manage/weights" element={<Weights />} />
        <Route path="/manage/weights/create" element={<CreateWeight />} />

        <Route path="/manage/distances" element={<Distances />} />
        <Route path="/manage/distances/create" element={<CreateDistance />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
