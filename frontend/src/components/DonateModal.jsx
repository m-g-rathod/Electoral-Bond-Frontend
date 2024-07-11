import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useAccount, useWriteContract, useChainId, useWalletClient } from "wagmi";
import { Bounce, toast } from "react-toastify";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

export default function DonateModal({ setIsDonate, partyName, partyChannel }) {
  const [amt, setAmt] = useState(0.0);
  const account = useAccount();
  const { writeContract, status, isError, error, writeContractAsync } = useWriteContract();
  const chainId = useChainId();
  const {data: signer, refetch} = useWalletClient({
    account: account.address
  });

  const getParty = () => {
    if (partyName === "bjp") return "Bhartiya Janata Party";
    else if (partyName === "congress") return "Indian National Congress";
    else if (partyName === "aap") return "Aam Aadmi Party";
  };

  useEffect(() => {
    console.log(partyChannel)
  }, []);

  useEffect(() => {
    if(account.address != undefined || account.address !== '0x0000000000000000000000000000000000000000')
    {
      refetch();
    }
  }, [account]);

  const getSubs = async () => {
    try {
      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.STAGING,
      });
  
      const subs = await user.notification.subscriptions();
  
      // console.log(subs);

      return subs;      
    } catch (error) {
      throw new Error(error);
    }

  }

  const subscribe = async () => {
    try { 
      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.STAGING,
      });

      const response = await user.notification.subscribe('0x5d44f1412ED9B71f1FE8Dc32128d175Ed797E489')
      console.log(response); 
      
    } catch (e) {
      throw new Error(e);
    }
  };

  const transfer = async () => {
    try {

      const subscriptions = await getSubs();
      console.log(subscriptions)

      const check = subscriptions.some(item => item.channel === partyChannel);

      if(subscriptions.length === 0 || !check) {
        await subscribe();
      }

      const weiAmount = ethers.parseEther(amt.toString());

      const res = await writeContractAsync({
        abi,
        address: contractAddresses[chainId][0],
        functionName: "transferBond",
        args: [partyName, weiAmount],
        value: weiAmount,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      setIsDonate(false);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (error !== null) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }
  }, [error]);

  useEffect(() => {
    if (status === "pending") {
      toast.info(`Transferring amount to ${getParty()}. Please wait....`, {
        toastId: "mapAddress",
        position: "top-center",
        autoClose: false,
        transition: Bounce,
      });
    } else if (status === "success") {
      toast.dismiss("mapAddress");
      setAmt(0);
      setIsDonate(false);
      toast.success(`Successfully transferred amount to ${getParty()}!!`, {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce,
      });
    }
  }, [status]);

  const handleClick = async () => {
    if (
      account.address === undefined ||
      account.address === "0x0000000000000000000000000000000000000000"
    ) {
      toast.error("Connect your wallet first", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    } else {
      if (amt === 0) {
        toast.error("You need to donate some non-zero amount", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } else {
        await transfer();
      }
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-[#000000] bg-opacity-25 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-[12px] bg-white text-left transition-all my-8 w-full max-w-2xl">
            <div className="flex bg-[#F6F6F6] justify-between items-center px-7 py-3 text-[#212529] font-medium text-[20px]">
              Donate to {getParty()}
              <button
                className="bg-transparent "
                onClick={() => setIsDonate(false)}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.773438 11.2266L11.2267 0.773315M0.773438 0.773315L11.2267 11.2266"
                    stroke="#898989"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col px-7 py-4 gap-6 w-full">
              <div className="flex w-full gap-3 items-center">
                <label htmlFor="eth_amt" className="text-base font-normal">
                  Enter Amount
                </label>
                <input
                  value={amt}
                  onChange={(e) => setAmt(e.target.value)}
                  type="number"
                  className="w-[50%] py-2 px-3 rounded-lg shadow border"
                  id="eth_amt"
                  step="any"
                />
                <p className="flex gap-1 items-center text-base">
                  <FaEthereum className="w-6 h-6 text-blue-950" /> ETH
                </p>
              </div>

              <div className="flex w-full justify-center">
                <button
                  onClick={() => handleClick()}
                  className="bg-blue-900 text-white text-base font-semibold px-4 py-2 rounded-lg"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
