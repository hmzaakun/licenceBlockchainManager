import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJsonInfos } from "../../utils/pinata";
import { ITokenURI } from "../../interfaces/tokenURI";
import { getAllCollections } from "../../utils/contracts/readers/factory";
import { getTokenURI } from "../../utils/contracts/readers/collection";

const Licences = () => {
    const [URIs, setURIs] = useState<ITokenURI[]>([]);

    useEffect(() => {
        async function getDatas() {
            const licences = await getAllCollections();
            let allURIs: ITokenURI[] = [];
            for (let i = 0; i < licences.length; i++) {
                const uri = await getTokenURI(licences[i]);
                console.log(licences[i]);
                const uriToJson = await getJsonInfos(uri);
                allURIs.push(uriToJson);
            }
            setURIs(allURIs);
        }
        getDatas();
    }, []);

    return (
        <div className="rounded-lg mx-auto p-8 lg:col-span-3 lg:p-12 lg:pt-24">
            <h2 className="text-3xl font-semibold text-center text-white">Licences</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mt-8">
                {URIs.map((URI, i) => (
                    <Link key={i} to={`/Licence/${i}`} className="group relative block bg-black">
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
                                    <p className="text-sm text-white">
                                        {URI.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Licences;