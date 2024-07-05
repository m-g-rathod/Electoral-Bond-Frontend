import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Advertise from "../components/Advertise";

export default function Donate ({selectedParty}) {
    const {partyId} = useParams();

    const [selectedCategory, setSelectedCategory] = useState(0)
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        fetch(
            `http://127.0.0.1:5000/api/party/adv/${partyId}`,
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
              setAdvertisements(res.result);
              setSelectedCategory(res.result[0].id);
            })
            .catch((err) => {
              console.log(err);
            });
    }, []);

    const getParty = () => {
        if(selectedParty === 'BJP')
            return 'Bhartiya Janata Party'
    }

    return(
        <div>
            <h1 className="text-3xl text-center font-semibold mt-10">{getParty()}</h1>
            <Advertise advertisements={advertisements} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <div className="flex w-full justify-center mb-10">
                <button className="bg-purple-600 rounded px-4 py-2 text-white font-medium">Donate</button>
            </div>
        </div>
    )
}