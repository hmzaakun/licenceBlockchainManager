import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";

const client = createThirdwebClient({
    clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID || "",
});

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