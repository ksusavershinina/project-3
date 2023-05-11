import Registration from "./pages/Registration";
import Main from "./pages/Main";
import UserProfile from "./pages/UserProfile"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from "react";

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main isSignedIn={isSignedIn} />} />
          <Route path="/registration" element={<Registration mode={true} setIsSignedIn={setIsSignedIn} />} />
          <Route path="/login" element={<Registration mode={false} setIsSignedIn={setIsSignedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
