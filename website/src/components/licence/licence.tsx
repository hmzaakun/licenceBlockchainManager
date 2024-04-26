import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ITokenURI } from "../../interfaces/tokenURI";
import { getMaxSupply, getPrice, getTokenURI, getTotalSupply } from "../../utils/contracts/readers/collection";
import { getJsonInfos } from "../../utils/pinata";
import { getCollectionAddress } from "../../utils/contracts/readers/factory";
import { mintCollection } from "../../utils/contracts/callers/factory";
import { useActiveAccount } from "thirdweb/react";

const Licence = () => {
    const [URI, setURI] = useState<ITokenURI | null>(null);
    const [price, setPrice] = useState<string>("...");
    const [totalSupply, setTotalSupply] = useState<string>("0");
    const [maxSupply, setMaxSupply] = useState<string>("0");
    const [message, setMessage] = useState<string>("Buy");

    const account = useActiveAccount();

    const id = useParams().id;

    useEffect(() => {
        async function getDatas() {
            const contractAddress = await getCollectionAddress(id!);
            const uri = await getTokenURI(contractAddress);
            const uriToJson = await getJsonInfos(uri);
            setURI(uriToJson);
            const price = await getPrice(contractAddress);
            setPrice(price.toString());
            const totalSupply = await getTotalSupply(contractAddress);
            setTotalSupply(totalSupply.toString());
            const maxSupply = await getMaxSupply(contractAddress);
            setMaxSupply(maxSupply.toString());
        }
        if (id) {
            getDatas();
        }
    }, [id]);

    async function buy() {
        if (!account) return setMessage("Connect your wallet");
        if (!id) {
            setMessage("Error");
            return;
        }
        setMessage("Buying...");
        const tx = await mintCollection(account?.address, id, price);
        if (tx) setMessage("Bought");
        else setMessage("Error");
    }


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
                    <div>
                        <p className="text-white text-lg mt-4">{totalSupply} / {maxSupply} minted</p>
                        <div className="flex items-center gap-2">
                            <button onClick={buy} className="bg-black text-white px-4 py-2 mt-4 rounded-lg">{message}</button>
                            <h3 className="text-white text-xl font-thin mt-4">{price} ETH</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Licence;