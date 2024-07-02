import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import "./Web3Provider";
import { Web3Provider } from "./Web3Provider";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <div className="w-screen h-full">
          <Web3Provider>
            <Navbar />
          </Web3Provider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/party/*" element={<ProtectedRoute />}>
              <Route path="home" element={<Home />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
