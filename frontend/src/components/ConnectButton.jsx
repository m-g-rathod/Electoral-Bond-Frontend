import { useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount, useWriteContract, useReadContract, useChainId } from "wagmi";
import { contractAddresses, abi } from "../../constants";

let temp = true;

export const ConnectButton = () => {
  
  const account = useAccount();
  const {writeContract} = useWriteContract();
  const chainId = useChainId();

  // useEffect(() => {
  //   console.log(account.address);

  //   if(account.address && temp) {
  //     temp = false;

  //     writeContract({
  //       abi,
  //       address: contractAddresses[chainId][0],
  //       functionName: 'mapAddress',
  //       args: [
  //         localStorage.getItem('party'),
  //         account.address
  //       ]
  //     })
  //   }

  // }, [account]);

  return (
    // <ConnectKitButton.Custom>
    //   {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
    //     return (
    //       <button onClick={() => handleClick(address)} className="px-3 py-2 bg-blue-600 rounded-lg text-white font-medium cursor-pointer">
    //         {isConnected ? `${address.slice(0, 6)}....${address.slice(address.length - 4)}` : "Connect Wallet"}
    //       </button>
    //     );
    //   }}
    // </ConnectKitButton.Custom>
    <ConnectKitButton />
  );
};