import React, { useContext, useEffect } from "react";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CreateAssessment from "./pages/Assessment/CreateAssessment";
import CreateFrequency from "./pages/Frequency/CreateFrequency";
import CreateWeight from "./pages/Weight/CreateWeight";
import Assessments from "./pages/Assessment/Assessments";
import Frequencies from "./pages/Frequency/Frequencies";
import Weights from "./pages/Weight/Weights";
import Distances from "./pages/Distance/Distances";
import CreateDistance from "./pages/Distance/CreateDistance";
import UpdateAssessment from "./pages/Assessment/UpdateAssessment";
import UpdateWeight from "./pages/Weight/UpdateWeight";
import UpdateFrequency from "./pages/Frequency/UpdateFrequency";
import UpdateDistance from "./pages/Distance/UpdateDistance";
import UserAssessment from "./pages/UserAssessment/UserAssessment";
import Login from "./pages/Account/Login";
import { UserContext } from "./contexts/user";

function App() {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Routes>
        {/* ADMIN PART */}

        {user.token ?
          <>
            <Route path="/manage" element={<Home />} />

            <Route path="/assessments" element={<Assessments />} />
            <Route path="/assessments/create" element={<CreateAssessment />} />
            <Route path="/assessments/update/:id" element={<UpdateAssessment />} />

            <Route path="/frequencies" element={<Frequencies />} />
            <Route path="/frequencies/create" element={<CreateFrequency />} />
            <Route path="/frequencies/update/:id" element={<UpdateFrequency />} />

            <Route path="/weights" element={<Weights />} />
            <Route path="/weights/create" element={<CreateWeight />} />
            <Route path="/weights/update/:id" element={<UpdateWeight />} />

            <Route path="/distances" element={<Distances />} />
            <Route path="/distances/create" element={<CreateDistance />} />
            <Route path="/distances/update/:id" element={<UpdateDistance />} />

          </>
          :
          <Route path="*" element={<Navigate to="/account/login" replace />} />
        }

        <Route path="/account/login" element={<Login />} />

        {/* USER PART */}

        <Route path="/" element={<UserAssessment />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
