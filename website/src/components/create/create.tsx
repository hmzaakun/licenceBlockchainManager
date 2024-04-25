import { useState } from "react";
import { pinFileToIPFS, pinJSONToIPFS } from "../../utils/pinata";

const Create = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("Create licences");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    async function submitForm(e: any) {
        e.preventDefault();
        const name = e.target.name.value;
        const supply = e.target.supply.value;
        const description = e.target.description.value;
        const imageHash = await uploadImage();
        if (imageHash) {
            setMessage("Creating licence...");
            const data = {
                name,
                description,
                imageHash,
            };
            const jsonFileResponse = await pinJSONToIPFS("metada", JSON.stringify(data));
            console.log("json", jsonFileResponse.IpfsHash);
            // TODO : ADD DEPLOY CONTRACT
        }
        setMessage("Licence created");

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

    return (
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
                            placeholder="Supply"
                            type="number"
                            id="supply"
                        />
                    </div>
                    <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Description"
                        rows={8}
                        id="description"
                    ></textarea>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-800 file:cursor-pointer file:disabled:opacity-50 file:disabled:pointer-events-none" />
                    </label>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    >
                        {message}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Create;