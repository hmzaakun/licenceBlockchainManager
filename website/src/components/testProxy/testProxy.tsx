import { useState } from "react";
import { testProxy } from "../../utils/contracts/callers/proxy";

const TestProxy = () => {
    const [message, setMessage] = useState<string>("");

    async function submitForm(e: any) {
        e.preventDefault();
        const number = e.target.number.value
        const tx = await testProxy(number);
        if (tx) setMessage("Success");
        else setMessage("Error");
    }
    return (
        <div className="pt-20">
            <form onSubmit={(e) => submitForm(e)}>
                <input type="number" id="number" placeholder="Number" />
                <button className="bg-white text-black px-4 py-2 mt-4 rounded-lg">Submit</button>
                <p className="text-white">{message}</p>
            </form>
        </div>
    );
}

export default TestProxy;