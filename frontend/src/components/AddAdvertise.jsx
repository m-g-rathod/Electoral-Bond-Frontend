import { useEffect, useState } from "react";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default function AddAdvertise({ categories, setIsSelected, setIsFetch }) {
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      partyId: localStorage.getItem('partyId'),
      selectedOption: selectedOption.value,
      title: title,
      description: description
    }

    fetch(`http://127.0.0.1:5000/api/party/add_adv`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);

      setSelectedOption(null);
      setTitle('');
      setDescription('');

      setIsSelected('adv');
      setIsFetch(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <form className="px-72 " onSubmit={(e) => handleSubmit(e)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Advertisement Category
              </label>
              <div className="mt-2">
                <CreatableSelect isSearchable isClearable defaultValue={selectedOption} onChange={setSelectedOption} options={categories} className="shadow-sm "/>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input type="text" className="shadow-sm border px-3 py-2 w-full" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}/>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md px-3 border py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about the advertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
