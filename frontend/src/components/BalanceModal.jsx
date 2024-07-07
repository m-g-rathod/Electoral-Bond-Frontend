import { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";

export default function BalanceModal({address, totalFunds, setIsBalance}) {

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
              Total Funds
              <button
                className="bg-transparent "
                onClick={() => setIsBalance(false)}
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
              <div className="flex w-full gap-3 items-center">
                <p className="text-lg font-normal">
                  Account address: {`${address.slice(0, 6)}...${address.slice(address.length - 4)}`}
                </p>
              </div>

                <div className="flex w-full items-center gap-2">
                    <p className="flex items-center gap-6 text-lg font-normal">
                        Total Funds: {Number(totalFunds)}
                    </p>

                    <p className="flex items-center">
                        <FaEthereum className="text-blue-900 w-5 h-5" /> ETH
                    </p>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
