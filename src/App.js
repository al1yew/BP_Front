//#region imports 
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
import Login from "./pages/Account/Login";
import Assess from "./pages/Assess/Assess";
import { UserContext } from "./contexts/user";
import MakeAssessment from "./pages/Assess/MakeAssessment";
import Users from "./pages/User/Users";
import CreateUser from "./pages/User/CreateUser";
import UpdateUser from "./pages/User/UpdateUser";
import ResetPassword from "./pages/User/ResetPassword";
//#endregion  imports

function App() {

  const { user } = useContext(UserContext);

  return (
    <>
      <Header />

      <Routes>
        {user.token ?
          <>
            <Route path="/manage" element={<Home />} />

            <Route path="/manage/assessments" element={<Assessments />} />
            <Route path="/manage/assessments/create" element={<CreateAssessment />} />
            <Route path="/manage/assessments/update/:id" element={<UpdateAssessment />} />

            <Route path="/manage/frequencies" element={<Frequencies />} />
            <Route path="/manage/frequencies/create" element={<CreateFrequency />} />
            <Route path="/manage/frequencies/update/:id" element={<UpdateFrequency />} />

            <Route path="/manage/weights" element={<Weights />} />
            <Route path="/manage/weights/create" element={<CreateWeight />} />
            <Route path="/manage/weights/update/:id" element={<UpdateWeight />} />

            <Route path="/manage/distances" element={<Distances />} />
            <Route path="/manage/distances/create" element={<CreateDistance />} />
            <Route path="/manage/distances/update/:id" element={<UpdateDistance />} />

            <Route path="/manage/users" element={<Users />} />
            <Route path="/manage/users/create" element={<CreateUser />} />
            <Route path="/manage/users/update/:id" element={<UpdateUser />} />
            <Route path="/manage/users/resetpassword/:id" element={<ResetPassword />} />
          </>
          :
          // <Route path="*" element={<Navigate to="/manage/account/login" replace />} />
          <Route path="*" element={<NotFound />} />
        }

        {
          !user.token &&
          <Route path="/manage/account/login" element={<Login />} />
        }

        <Route path="/" element={<Assess />} />
        <Route path="/makeassessment" element={<MakeAssessment />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
