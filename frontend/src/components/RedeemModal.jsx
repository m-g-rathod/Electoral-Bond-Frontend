import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { ethers } from "ethers";
import { useStorageAt } from "wagmi";
import { Bounce, toast } from "react-toastify";
import { useWriteContract, useChainId, useAccount } from "wagmi";
import {abi, contractAddresses} from "../../constants"

export default function RedeemModal({ totalFunds, setIsRedeem, connectedWalletAddr }) {
  const [remark, setRemark] = useState("");
  const [amt, setAmt] = useState(0.0);
  const chainId = useChainId();
  const account = useAccount();
  const {writeContract, writeContractAsync, data, status} = useWriteContract()

  useEffect(() => {
    if(status === 'pending')
    {
      toast.info('Redeeming your funds. Please wait....', {
        position: "top-center",
        autoClose: false,
        toastId: 'redeemToast',
        transition: Bounce
      })
    }
    else if(status === "success")
    {
      toast.dismiss('redeemToast');
      toast.success('Successfully redeemed your funds...', {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce
      });
      setRemark('');
      setAmt(0.0);
      setIsRedeem(false);
    } 
  }, [status]);

  const handleClick = async () => {
    const weiAmt = ethers.parseEther(amt.toString());
    
    if(weiAmt > totalFunds)
    {
      toast.error('Not sufficient funds', {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce
      })

      return;
    }

    if(remark === '')
    {
      toast.error('Please add remark', {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce
      })

      return;
    }

    if(account.address !== connectedWalletAddr)
    {
      toast.error('First connect your wallet to the same connected wallet address', {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce
      })
      return;
    }

    try {
      const res = await writeContractAsync({
        abi,
        address: contractAddresses[chainId][0],
        functionName: 'useFunds',
        args: [localStorage.getItem('party'), weiAmt, remark],
        value: weiAmt
      });

      console.log(res);
    } catch (error) {
      toast.dismiss('redeemToast');
      // toast.error(error.message, {
      //   position: "top-right",
      //   autoClose: 7000,
      //   transition: Bounce
      // })
      console.log(error);
      console.log(error.message)
    }
  
  }

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
              Redeem Funds
              <button
                className="bg-transparent "
                onClick={() => setIsRedeem(false)}
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoininejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col px-7 py-4 gap-6 w-full">
              <div className="flex w-full items-center gap-2">
                <p className="flex items-center gap-6 text-lg font-normal">
                  Total Funds:{" "}
                  {parseFloat(ethers.formatEther(totalFunds)).toFixed(8)}
                </p>

                <p className="flex items-center">
                  <FaEthereum className="text-blue-900 w-5 h-5" /> ETH
                </p>
              </div>

              <div className="flex w-full gap-3 items-center">
                <label htmlFor="eth_amt" className="text-lg font-normal">
                  Amount to Redeem
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
                  <FaEthereum className="w-5 h-5 text-blue-900" /> ETH
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="remark"
                  className="text-lg flex items-center gap-2"
                >
                  Remark{" "}
                  <p className="text-lg text-red-700 font-semibold ">*</p>
                </label>
                <textarea
                  name="remark"
                  id="remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg shadow"
                  placeholder="Add Remark"
                ></textarea>
              </div>

              <div className="flex w-full justify-center">
                <button
                  className="px-3 py-2 rounded-lg bg-purple-600 text-white font-semibold"
                  onClick={() => handleClick()}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
