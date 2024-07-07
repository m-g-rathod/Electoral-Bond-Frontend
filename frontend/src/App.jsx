import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import "./Web3Provider";
import { Web3Provider } from "./Web3Provider";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Donate from "./pages/Donate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [selectedPartyId, setSelectedPartyId] = useState(0);
  const [isBalance, setIsBalance] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('auth') === 'true';
    const authTimestamp = localStorage.getItem('authTimestamp');
    const currentTime = new Date().getTime();

    const expirationTime = 90 * 60 * 1000;

    if (isAuth && authTimestamp) {
      if (currentTime - authTimestamp > expirationTime) {
        localStorage.removeItem('auth');
        localStorage.removeItem('authTimestamp');
      }
    }

  }, []);

  return (
    <>
      <Router>
        <div className="w-screen h-full">
            <Navbar setIsBalance={setIsBalance}/>
          <Routes>
            <Route path="/" element={<Landing setSelectedPartyId={setSelectedPartyId}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/party/*" element={<ProtectedRoute />}>
              <Route path="home" element={<Home isBalance={isBalance} setIsBalance={setIsBalance}/>} />
            </Route>

            <Route path="/donate/:partyName" element={<Donate selectedPartyId={selectedPartyId}/>} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
