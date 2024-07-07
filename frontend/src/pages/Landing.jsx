import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function Landing({setSelectedPartyId}) {
  const [partyData, setPartyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/get_parties`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);

        setPartyData(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (partyId, partyName) => {
    setSelectedPartyId(partyId);
    navigate(`/donate/${partyName}`)
    
  }

  return (
    <section className="text-gray-600 px-16 py-16 body-font">
      <div className="container mx-auto flex md:flex-row flex-col items-start">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            What is Decentralized Electoral Bond (DEB) ?
          </h1>
          <p className="mb-8 text-lg">
            A decentralized electoral bond is a blockchain-based financial
            instrument designed to enable anonymous, transparent, and secure
            funding of political parties. It leverages smart contracts to ensure
            that donations are tracked and regulated without revealing the
            identity of the donor.
          </p>
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Advantages of DEB:
          </h1>
          <ul className="list-disc pl-8 flex flex-col gap-2">
            <li className="text-lg">
              <strong>Anonymity:</strong> Donors can contribute without
              revealing their identities, ensuring privacy and reducing the risk
              of political retaliation.
            </li>
            <li className="text-lg">
              <strong>Security:</strong> Blockchain technology provides robust
              security against fraud, hacking, and tampering.
            </li>
            <li className="text-lg">
              <strong>Trust:</strong> The decentralized nature eliminates the
              need for intermediaries, building trust among stakeholders.
            </li>
            <li className="text-lg">
              <strong>Accessibility:</strong> Enables a wider range of donors,
              including those from different geographical regions, to
              participate easily.
            </li>
          </ul>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={`/deb.png`}
          />
        </div>
      </div>

      <div className="flex flex-wrap w-full gap-8 justify-between mt-16">
        {partyData.map((party, index) => (
          <div key={index} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex justify-center w-full">
              <img
                  class="rounded-t-lg"
                  src={`/${party.partyName.toLowerCase()}.png`}
                  alt=""
                />
            </div>
            
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {party.partyName}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <button
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleClick(party.id, party.partyName.toLowerCase())}
              >
                Donate Now
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
