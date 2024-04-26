import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ITokenURI } from "../../interfaces/tokenURI";
import { getPrice, getTokenURI } from "../../utils/contracts/readers/collection";
import { getJsonInfos } from "../../utils/pinata";
import { getCollectionAddress } from "../../utils/contracts/readers/factory";

const Licence = () => {
    const [URI, setURI] = useState<ITokenURI | null>(null);
    const [price, setPrice] = useState<string>("...");

    const id = useParams().id;

    useEffect(() => {
        async function getDatas() {
            const contractAddress = await getCollectionAddress(id!);
            const uri = await getTokenURI(contractAddress);
            const uriToJson = await getJsonInfos(uri);
            setURI(uriToJson);
            const price = await getPrice(contractAddress);
            setPrice(price.toString());
        }
        if (id) {
            getDatas();
        }
    }, [id]);


    return (
        <div className="mx-auto lg:p-12 lg:pt-24">
            <div className="flex justify-around mt-14 w-full">
                <img
                    alt=""
                    src={URI?.image}
                    className="h-[70vh] w-[70vh] object-cover"
                />
                <div className="w-[55%] pt-2 flex flex-col justify-around items-start">
                    <div>
                        <h1 className="text-white text-3xl font-semibold w-full">{URI?.name}</h1>
                        <p className="text-white text-lg mt-4">
                            {URI?.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-black text-white px-4 py-2 mt-4 rounded-lg">Buy</button>
                        <h3 className="text-white text-xl font-thin mt-4">{price} ETH</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Licence;