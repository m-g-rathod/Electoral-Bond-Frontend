import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Advertise from "../components/Advertise";
import DonateModal from "../components/DonateModal";
import { useReadContract, useChainId } from "wagmi";
import { contractAddresses, abi } from "../../constants";

export default function Donate({ selectedPartyId }) {
  const { partyName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [advertisements, setAdvertisements] = useState([]);
  const [isDonate, setIsDonate] = useState(false);
  const [partyChannel, setPartyChannel] = useState('');
  const chainId = useChainId();
  const {data, refetch, error} = useReadContract({
    abi,
    address: contractAddresses[chainId][0],
    functionName: 'getPartyChannel',
    args: [partyName]
  });

  useEffect(() => {
    // console.log(selectedPartyId);
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
        setSelectedCategory(res.result[0].id);
      })
      .catch((err) => {
        console.log(err);
      });

      // getPartyChannel();
  }, []);

  useEffect(() => {
    if(partyName.length > 0)
    {
      refetch();
    }
  }, [partyName]);

  useEffect(() => {
    if(data !== undefined)
    {
      setPartyChannel(data);
    }
  }, [data]);

  const getParty = () => {
    if (partyName === "bjp") return "Bhartiya Janata Party";
    else if (partyName === "congress") return "Indian National Congress";
    else if (partyName === "aap") return "Aam Aadmi Party";
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold mt-10">{getParty()}</h1>
      <Advertise
        advertisements={advertisements}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex w-full justify-center mb-10">
        <button
          onClick={() => setIsDonate(true)}
          className="bg-blue-900 text-white text-base font-semibold px-4 py-2 rounded-lg"
        >
          Donate
        </button>
      </div>

      {isDonate && (
        <DonateModal setIsDonate={setIsDonate} partyName={partyName} partyChannel={partyChannel}/>
      )}
    </div>
  );
}
