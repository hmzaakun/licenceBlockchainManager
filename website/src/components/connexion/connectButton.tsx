import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { client } from "../../utils/contracts/variables";



const Connect = () => {

    return (
        <ThirdwebProvider>
            <ConnectButton
                client={client}
                accountAbstraction={{
                    chain: sepolia, // the chain where your smart accounts will be or is deployed
                    factoryAddress: "0x1b17271D90b91B82802E5C31120Fcf0ffF3A1676", // your deployed factory address
                    gasless: true, // enable or disable gasless transactions
                }}
            />
        </ThirdwebProvider>
    );
}

export default Connect;