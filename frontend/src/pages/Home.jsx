import { useState } from "react";

export default function Home() {
    const partyName = localStorage.getItem('party');
    const [isSelected, setIsSelected] = useState('adv');

    const getPartyName = () => {
        if(partyName === 'BJP')
            return 'Bhartiya Janata Party'

        else if(partyName === 'Congress')
            return 'Indian National Congress'
    }

    return(
        <>
        <div className="w-full py-9">
            <h1 className="text-3xl font-medium text-center">{getPartyName()}</h1>
            <div className="flex mx-auto px-3 py-2 gap-3 bg-gray-200 w-fit rounded my-6">
                <button onClick={() => setIsSelected('adv')} className={`cursor-pointer ${isSelected === 'adv' ? 'bg-white font-medium' : 'bg-transparent font-normal'} rounded px-3 py-1 text-base` }>
                    Advertisement
                </button>
                <button onClick={() => setIsSelected('add_adv')} className={`cursor-pointer ${isSelected === 'add_adv' ? 'bg-white font-medium' : 'bg-transparent font-normal'} rounded px-3 py-1 text-base` }>
                    Add Advertisement
                </button>
            </div>
        </div>
                    
        </>
    )
}