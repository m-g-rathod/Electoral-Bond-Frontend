export default function Landing() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-16 py-16 md:flex-row flex-col items-start">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            What is Decentralized Electoral Bond (DEB) ?
          </h1>
          <p className="mb-8 text-lg">
          A decentralized electoral bond is a blockchain-based financial instrument designed to enable anonymous, 
          transparent, and secure funding of political parties. It leverages smart contracts to ensure that donations are tracked and 
          regulated without revealing the identity of the donor.
          </p>
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Advantages of DEB:
          </h1>
          <ul className="list-disc pl-8 flex flex-col gap-2">
            <li className="text-lg"><strong>Anonymity:</strong> Donors can contribute without revealing their identities, ensuring privacy and reducing the risk of political retaliation.</li>
            <li className="text-lg"><strong>Security:</strong> Blockchain technology provides robust security against fraud, hacking, and tampering.</li>
            <li className="text-lg"><strong>Trust:</strong> The decentralized nature eliminates the need for intermediaries, building trust among stakeholders.</li>
            <li className="text-lg"><strong>Accessibility:</strong> Enables a wider range of donors, including those from different geographical regions, to participate easily.</li>
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
    </section>
  );
}
