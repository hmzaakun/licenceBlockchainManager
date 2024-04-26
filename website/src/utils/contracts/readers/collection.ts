import { sepolia } from "thirdweb/chains";
import { client } from "../variables";
import { getContract, readContract } from "thirdweb";
import { ethers } from "ethers";

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
        method: "function getTokenURI() public view returns (string memory)",
        params: [],
    });
}

export async function getPrice(contractAddress: string) {
    const contract = get_contract(contractAddress);
    const price = await readContract({
        contract: contract,
        method: "function getMintPrice() public view returns (uint256)",
        params: [],
    });
    return ethers.formatEther(price);
}

export async function getTotalSupply(contractAddress: string) {
    const contract = get_contract(contractAddress);
    return await readContract({
        contract: contract,
        method: "function getTotalSupply() public view returns (uint256)",
        params: [],
    });
}

export async function getMaxSupply(contractAddress: string) {
    const contract = get_contract(contractAddress);
    return await readContract({
        contract: contract,
        method: "function getMaxSupply() public view returns (uint256)",
        params: [],
    });
}