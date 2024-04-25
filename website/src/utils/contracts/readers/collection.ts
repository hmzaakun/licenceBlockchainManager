import { sepolia } from "thirdweb/chains";
import { client } from "../variables";
import { getContract, readContract } from "thirdweb";

function get_contract(address: string) {
    const contract = getContract({
        client,
        chain: sepolia,
        address: address,
    });
    return contract;
}

export async function getTokenURI(contractAddress: string) {
    const contract = get_contract(contractAddress);
    return await readContract({
        contract: contract,
        method: "function tokenURI() public view returns(string memory)",
        params: [],
    });
}

export async function getPrice(contractAddress: string) {
    const contract = get_contract(contractAddress);
    return await readContract({
        contract: contract,
        method: "function getMintPrice() external view returns(uint256)",
        params: [],
    });
}