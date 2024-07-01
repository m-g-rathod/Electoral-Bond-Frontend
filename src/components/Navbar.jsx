import { useState, useEffect, useContext } from "react";
import { IoIosMenu } from "react-icons/io";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ConnectButton } from "./ConnectButton";
import { useReadContract, useChainId } from "wagmi";
import { contractAddresses, abi } from "../../constants";
// import { useMoralis } from "react-moralis";

function Navbar() {
  const [isClick, setIsClick] = useState(false);
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const chainId = useChainId();


  return (
    <div className="flex flex-col">
      <nav className="flex w-full px-6 py-3 justify-between shadow-md">
        <h1 className="font-medium sm:text-2xl text-lg">Electoral Bond</h1>
        <div className="sm:flex gap-4 hidden">
          {isAuth && <ConnectButton />}
          {!isAuth && <Link to="/login" className="px-3 py-2 bg-green-600 rounded-lg text-white font-medium cursor-pointer hover:no-underline">
            Login
          </Link>}
          {isAuth && <button onClick={() => setIsAuth(false)} className="px-3 py-2 bg-red-500 rounded-lg text-white font-medium cursor-pointer">
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
