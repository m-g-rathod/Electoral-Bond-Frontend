import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Login from "./pages/Login"
import './Web3Provider'
import { Web3Provider } from "./Web3Provider"

function App() {

  return (
    <>
      <Router>
        <div className='w-screen h-full'>
          <Web3Provider>
            <Navbar />
          </Web3Provider>
          <Routes>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
