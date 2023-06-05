import Registration from "./pages/Registration";
import Main from "./pages/Main";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from "react";

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    telegram: '',
    skills: '',
    companyName: '',
    website: '',
    companyLogo: '',
    personalLogo: '',
    accessToken: ''
  })

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser);
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser.user.student) {
        setUserData({
          email: foundUser.user.student.email,
          name: foundUser.user.student.Name,
          telegram: foundUser.user.student.Telegram,
          skills: foundUser.user.student.Skills,
          companyName: '',
          website: '',
          companyLogo: '',
          personalLogo: foundUser.user.student.Avatar,
          accessToken: foundUser.accessToken
        })
      }
      else {
        setUserData({
          email: foundUser.user.employer.email,
          name: foundUser.user.employer.Name,
          telegram: foundUser.user.employer.Telegram,
          skills: foundUser.user.employer.Skills,
          companyName: foundUser.user.employer.NameCompany,
          website: foundUser.user.employer.Website,
          companyLogo: foundUser.user.employer.CompanyLogo,
          personalLogo: foundUser.user.employer.Avatar,
          accessToken: foundUser.accessToken
        })
      }
      
      setIsSignedIn(true)
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} userData={userData} />} />
          <Route path="/registration" element={<Registration mode={true} setIsSignedIn={setIsSignedIn} setUserData={setUserData} />} />
          <Route path="/login" element={<Registration mode={false} setIsSignedIn={setIsSignedIn} setUserData={setUserData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
