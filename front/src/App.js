import Registration from "./pages/Registration";
import Main from "./pages/Main";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from "react";

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

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main isSignedIn={isSignedIn} userData={userData} />} />
          <Route path="/registration" element={<Registration mode={true} setIsSignedIn={setIsSignedIn} setUserData={setUserData} />} />
          <Route path="/login" element={<Registration mode={false} setIsSignedIn={setIsSignedIn} setUserData={setUserData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
