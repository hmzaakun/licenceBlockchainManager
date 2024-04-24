import { useParams } from "react-router-dom";

const Licence = () => {

    const id = useParams().id;

    return (
        <div className="mx-auto lg:p-12 lg:pt-24">
            <div className="flex justify-around mt-14 w-full">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
                    className="h-[70vh] w-[70vh] object-cover"
                />
                <div className="w-[55%] pt-2 flex flex-col justify-around items-start">
                    <div>
                        <h1 className="text-white text-3xl font-semibold w-full">Licence {id}</h1>
                        <p className="text-white text-lg mt-4">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores
                            quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-black text-white px-4 py-2 mt-4 rounded-lg">Buy</button>
                        <h3 className="text-white text-xl font-thin mt-4">$100</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Licence;