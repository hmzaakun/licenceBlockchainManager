import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const client = createThirdwebClient({
    clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID || "",
});


export const contractFactory = getContract({
    client,
    chain: sepolia,
    address: process.env.REACT_APP_FACTORY_CONTRACT!,
});