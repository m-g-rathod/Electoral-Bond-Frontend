import { useState, useEffect, useContext } from "react";
import { IoIosMenu } from "react-icons/io";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ConnectButton } from "./ConnectButton";
import { useReadContract, useChainId } from "wagmi";
import { contractAddresses, abi } from "../../constants";
import { useNavigate } from "react-router-dom";
// import { useMoralis } from "react-moralis";

function Navbar({setIsBalance}) {
  const [isClick, setIsClick] = useState(false);
  const isAuth = localStorage.getItem('auth') === 'true';
  const chainId = useChainId();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('party');
    localStorage.removeItem('auth');
    navigate('/');
  }

  return (
    <div className="flex flex-col">
      <nav className="flex w-full px-10 py-3 justify-between shadow-md">
        <h1 className="font-medium sm:text-2xl text-lg">Decentralized Electoral Bond</h1>
        <div className="sm:flex gap-4 hidden">
          <ConnectButton />
          {
            isAuth && 
            <button onClick={() => setIsBalance(true)} className="px-3 py-2 bg-blue-800 rounded text-white font-medium cursor-pointer">Check Funds</button>
          }
          {!isAuth && <Link to="/login" className="px-3 py-2 bg-green-600 rounded-lg text-white font-medium cursor-pointer hover:no-underline">
            Login
          </Link>}
          {isAuth && <button onClick={() => handleLogout()} className="px-3 py-2 bg-red-500 rounded-lg text-white font-medium cursor-pointer">
            Logout
          </button>}
        </div>

        <button
          onClick={() => setIsClick((prev) => !prev)}
          className="sm:hidden block bg-transparent rounded-lg px-3 py-1 border shadow"
        >
          <IoIosMenu />
        </button>
      </nav>

      {isClick && (
        <div className="flex flex-col gap-2 w-full px-4 py-2">
          <button className="px-3 py-2 bg-blue-600 rounded-lg text-white font-medium cursor-pointer w-full">
            Connect Wallet
          </button>
          <button className="px-3 py-2 bg-violet-600 rounded-lg text-white font-medium cursor-pointer w-full">
            Change Wallet
          </button>
          <button className="px-3 py-2 bg-green-600 rounded-lg text-white font-medium cursor-pointer w-full">
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
