import { useEffect, useState } from "react";
import { getJsonInfos, pinFileToIPFS, pinJSONToIPFS } from "../../utils/pinata";
import { claim, createLicenseCollection } from "../../utils/contracts/callers/factory";
import { getCreatorCollections } from "../../utils/contracts/readers/factory";
import { ITokenURI } from "../../interfaces/tokenURI";
import { getTokenURI } from "../../utils/contracts/readers/collection";
import { useActiveAccount } from "thirdweb/react";
import { Link } from "react-router-dom";

const Create = () => {
    const [file, setFile] = useState<File | null>(null);
    const [URIs, setURIs] = useState<ITokenURI[]>([]);
    const [message, setMessage] = useState<string>("Create licences");

    const account = useActiveAccount();

    useEffect(() => {
        async function getDatas() {
            if (!account) return;
            const licences = await getCreatorCollections(account?.address);
            console.log(licences);

            let allURIs: ITokenURI[] = [];
            for (let i = 0; i < licences.length; i++) {
                const uri = await getTokenURI(licences[i]);
                console.log(uri);
                const uriToJson = await getJsonInfos(uri);
                allURIs.push(uriToJson);
            }
            console.log(allURIs);

            setURIs(allURIs);
        }
        getDatas();
    }, [account]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    async function submitForm(e: any) {
        if (!account) return alert("Please connect your wallet");
        e.preventDefault();
        const name = e.target.name.value;
        const symbol = e.target.symbol.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const supply = e.target.supply.value;
        const imageHash = await uploadImage();
        if (imageHash) {
            setMessage("Creating licence...");
            const data = {
                name,
                description,
                image: `https://ipfs.io/ipfs/${imageHash}`,
            };
            const jsonFileResponse = await pinJSONToIPFS("metada", JSON.stringify(data));
            console.log("json", jsonFileResponse.IpfsHash);
            setMessage("Deploying contract...");
            const tx = await createLicenseCollection(account?.address, name, symbol, price, supply, `https://ipfs.io/ipfs/${jsonFileResponse.IpfsHash}`);
            if (tx) setMessage("Licence created");
            else setMessage("Error creating licence");
        }
    }

    async function uploadImage() {
        if (file) {
            setMessage("Uploading image...");
            try {
                const response = await pinFileToIPFS(file);
                return response.IpfsHash;
            } catch (error) {
                console.error('Erreur lors de l\'upload :', error);
                alert('Erreur lors de l\'upload. Veuillez vérifier la console pour plus de détails.');
                return null;
            }
        }
    }

    async function submit() {
        if (!account) return alert("Please connect your wallet");
        const tx = await claim(account?.address);
        console.log(tx);
    }

    return (
        <div className="w-full">
            <div className="rounded-lg mx-auto max-w-xl p-8 lg:col-span-3 lg:p-12 lg:pt-24">
                <h2 className="text-3xl font-semibold text-center text-white">Create licence</h2>
                <form action="#" className="flex flex-col justify-between h-[60vh] mt-20" onSubmit={(e) => submitForm(e)}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm col-span-2"
                                placeholder="Name"
                                type="text"
                                id="name"
                            />
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Symbol"
                                type="text"
                                id="symbol"
                            />
                        </div>
                        <textarea
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Description"
                            rows={8}
                            id="description"
                        ></textarea>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm "
                                placeholder="Price"
                                type="text"
                                id="price"
                            />
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Supply"
                                type="number"
                                id="supply"
                            />
                        </div>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-800 file:cursor-pointer file:disabled:opacity-50 file:disabled:pointer-events-none" />
                        </label>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit" disabled={message !== "Create licences"}
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            {message}
                        </button>
                    </div>

                </form>
            </div>
            {account && (
                <>
                    <h2 className="text-3xl font-semibold text-center text-white mt-8">Licences created</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 p-8">
                        {URIs.map((URI, i) => (
                            <div key={i} className="group relative block bg-black">
                                <img
                                    alt=""
                                    src={URI.image}
                                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                />

                                <div className="relative p-4 sm:p-6 lg:p-8">
                                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">Licence</p>

                                    <p className="text-xl font-bold text-white sm:text-2xl">{URI.name}</p>

                                    <div className="mt-32">
                                        <div
                                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <button
                                                onClick={submit}
                                                className="text-sm text-white bg-black px-4 py-2 rounded-lg">
                                                claim
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Create;