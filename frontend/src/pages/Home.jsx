import { useEffect, useState } from "react";
import AddAdvertise from "../components/AddAdvertise";
import { FaArrowRight } from "react-icons/fa";
import Advertise from "../components/Advertise";

export default function Home() {
  const partyName = localStorage.getItem("party");
  const [isSelected, setIsSelected] = useState("adv");
  const [categories, setCategories] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

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
        console.log(res);
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
    console.log(categories);
  }, [categories]);

  const getPartyName = () => {
    if (partyName === "BJP") return "Bhartiya Janata Party";
    else if (partyName === "Congress") return "Indian National Congress";
    else if (partyName === "AAP") return "Aam Aadmi Party";
    else if (partyName === "TMC") return "Trinamool Congress";
  };

  return (
    <>
      <div className="w-full py-9 min-h-screen">
        <h1 className="text-3xl font-medium text-center">{getPartyName()}</h1>
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
      </div>
    </>
  );
}
