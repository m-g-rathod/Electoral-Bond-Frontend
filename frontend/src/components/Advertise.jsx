
export default function Advertise ({advertisements, selectedCategory, setSelectedCategory}) {

    return (
        <>
            <div className="flex w-full justify-between relative px-12 gap-12 my-16" >
                <div className="sticky top-0 w-1/4 px-5">
                    <h3 className="text-center font-semibold text-xl mb-5">Categories</h3>

                    <div className="flex flex-col gap-2 w-full border rounded px-4 py-3">
                        
                        {
                            advertisements.map((adv, index) => (
                                <>
                                    <button onClick={() => setSelectedCategory(adv.id)} key={index} className={`py-2 ${adv.id === selectedCategory ? 'text-lg font-medium' : 'text-base font-normal'} cursor-pointer`}>
                                        {adv.categoryName}
                                    </button>

                                    {index < advertisements.length - 1 && <hr />}
                                </>
                            ))
                        }
                    </div>
                </div>

                <div className="w-3/4">
                    <h3 className="text-center font-semibold text-xl mb-5">Advertisements</h3>
                    <div className="flex flex-col gap-8 w-full">
                        {
                            advertisements.filter(item => item.id === selectedCategory).map((adv, index) => (

                                adv.advertisements.map((item, ind) => (
                                    <div key={ind} className="flex flex-col gap-2 border rounded px-8 py-5">
                                        <h3 className="font-semibold text-lg">{item.adv_heading}</h3>
                                        <p className="text-base font-normal -mt-1">{item.description}</p>
                                    </div>
                                ))

                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}