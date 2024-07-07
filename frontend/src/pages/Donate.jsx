import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Advertise from "../components/Advertise";
import DonateModal from "../components/DonateModal";

export default function Donate({ selectedPartyId }) {
  const { partyName } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [advertisements, setAdvertisements] = useState([]);
  const [isDonate, setIsDonate] = useState(false);

  useEffect(() => {
    console.log(selectedPartyId);
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
        console.log(res);
        setAdvertisements(res.result);
        setSelectedCategory(res.result[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          className="bg-purple-600 rounded px-4 py-2 text-white font-medium"
        >
          Donate
        </button>
      </div>

      {isDonate && (
        <DonateModal setIsDonate={setIsDonate} partyName={partyName} />
      )}
    </div>
  );
}
