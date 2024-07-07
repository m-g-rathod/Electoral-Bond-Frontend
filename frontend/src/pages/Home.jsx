import { useEffect, useState } from "react";
import AddAdvertise from "../components/AddAdvertise";
import { FaArrowRight } from "react-icons/fa";
import Advertise from "../components/Advertise";
import { useReadContract, useChainId, useAccount, useWriteContract } from "wagmi";
import { contractAddresses, abi } from "../../constants";
import { Bounce, toast } from "react-toastify";
import BalanceModal from "../components/BalanceModal";

export default function Home({isBalance, setIsBalance}) {
  const partyName = localStorage.getItem("party");
  const [isSelected, setIsSelected] = useState("adv");
  const [categories, setCategories] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isMapped, setIsMapped] = useState(false);
  const chainId = useChainId();
  const account = useAccount();
  const {writeContract, writeContractAsync, status} = useWriteContract();

  const {refetch, data, isError, isFetched, isFetching, isLoading, isPending} = useReadContract({
    abi,
    address: contractAddresses[chainId][0],
    functionName: 'getWalletAddress',
    args: [partyName]
  });

  const {data: partyBalance, isError: isBalanceError, status: balanceStatus} = useReadContract({
    abi,
    address: contractAddresses[chainId][0],
    functionName: 'getPartyBalance',
    args: [partyName]
  });

  const fetchAds = () => {
    fetch(
      `http://127.0.0.1:5000/api/party/adv/${localStorage.getItem("partyId")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setAdvertisements(res.result);

        const temp = res.result.map(item => {
          
          const obj =  {
              value: item.categoryName,
              label: item.categoryName
            }
    
          return obj;
        })
        
        setSelectedCategory(res.result[0].id);
        setCategories(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAds();
  }, [isFetch]);

  useEffect(() => {
    if(status === 'pending')
    {
      toast.info(`Mapping your address to ${account.address.slice(0, 6)}....${account.address.slice(account.address.length - 4)}. Please wait...`,
        {
          toastId: 'mapAddress',
          position: "top-center",
          autoClose: false,
          transition: Bounce,
        }
      )
    }
    else if(status === 'success')
    {
      refetch();
      toast.dismiss('mapAddress')
      toast.success(`Successfully mapped your wallet address`, {
        position: "top-center",
        autoClose: 5000,
        transition: Bounce
      })
    }
  }, [status]);

  useEffect(() => {
    console.log(data); 
    if(data === undefined || data === '0x0000000000000000000000000000000000000000')
      setIsMapped(false);
    else
      setIsMapped(true);
  }, [data]);

  useEffect(() => {
    console.log(Number(partyBalance))
  }, [partyBalance]);

  const mapAddress = async () => {
    try {
      const res = await writeContractAsync({
        abi,
        address: contractAddresses[chainId][0],
        functionName: 'mapAddress',
        args: [
          partyName,
          account.address
        ],
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }  
  }

  const handleClick = async () => {
    if(account.address === undefined)
    {
      toast.error('Connect your wallet first', {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce
      });
    }
    else
    {
      await mapAddress();
      // location.reload();
      // // refetch();
    }
  }

  const handleChangeAddress = async () => {
    if(account.address === data || account.address === undefined || account.address === '0x0000000000000000000000000000000000000000')
    {
      toast.error('First connect your wallet to the desired address', {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce 
      })
    }
    else
    {
      await mapAddress();
      location.reload();
      // refetch();
    }
  }

  const getPartyName = () => {
    if (partyName === "bjp") return "Bhartiya Janata Party";
    else if (partyName === "congress") return "Indian National Congress";
    else if (partyName === "app") return "Aam Aadmi Party";
    else if (partyName === "tmc") return "Trinamool Congress";
  };

  return (
    <>
      <div className="w-full py-9 min-h-screen">
        <h1 className="text-3xl font-medium text-center">{getPartyName()}</h1>
        <div className="flex w-full gap-4 items-center justify-center mt-5">
          {
            !isMapped ? (
              <>
                <p className="text-lg font-normal ">Your wallet is not mapped. You won't be receiving funds, until you map your wallet address....</p>
                <button onClick={() => handleClick()} className="px-4 py-2 rounded bg-blue-800 text-white text-base font-medium">
                  Tap to Map
                </button>
              </>
            ) : (
              <>
                <p className="text-lg font-normal ">Your wallet address is mapped. You will receive all the funds on the address {`${data.slice(0, 6)}....${data.slice(data.length - 4)}`}</p>
                <button onClick={() => handleChangeAddress()} className="px-4 py-2 rounded bg-blue-800 text-white text-base font-medium">
                  Change address
                </button>
              </>
            )
          }
        </div>
        {/* <div className="flex w-full justify-center mt-5 items-center gap-5">
          <p className="text-lg font-normal">Check your total funds collected through bonds here....</p>
          <button onClick={() => setIsBalance(true)} className="px-3 py-2 bg-blue-800 rounded text-white font-medium cursor-pointer">Check Funds</button>
        </div> */}

        <div className="flex mx-auto px-3 py-2 gap-3 bg-gray-200 w-fit rounded my-6">
          <button
            onClick={() => setIsSelected("adv")}
            className={`cursor-pointer ${
              isSelected === "adv"
                ? "bg-white font-medium"
                : "bg-transparent font-normal"
            } rounded px-3 py-1 text-base`}
          >
            Advertisement
          </button>
          <button
            onClick={() => setIsSelected("add_adv")}
            className={`cursor-pointer ${
              isSelected === "add_adv"
                ? "bg-white font-medium"
                : "bg-transparent font-normal"
            } rounded px-3 py-1 text-base`}
          >
            Add Advertisement
          </button>
        </div>
        {isSelected === "add_adv" && (
          <div className="w-full">
            <AddAdvertise
              categories={categories}
              setIsSelected={setIsSelected}
              setIsFetch={setIsFetch}
            />
          </div>
        )}

        {isSelected === "adv" && advertisements.length === 0 && (
          <div className="flex justify-center mt-10 gap-4 items-center">
            <h1 className="text-xl font-normal text-center">
              No advertisements added..
            </h1>
            <button
              onClick={() => setIsSelected("add_adv")}
              className="text-white font-medium flex gap-3 items-center bg-purple-600 rounded px-3 py-2"
            >
              Add Advertisement <FaArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {isSelected === 'adv' && advertisements.length > 0 && <Advertise advertisements={advertisements} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}

        {isBalance && <BalanceModal address={data} totalFunds={partyBalance} setIsBalance={setIsBalance}/>}
      </div>
    </>
  );
}
