import { readContract } from "thirdweb";
import { contractFactory } from "../variables";
import { ethers } from "ethers";

export async function getAllCollections() {
    return await readContract({
        contract: contractFactory,
        // method: "function balanceOf(address) view returns (uint256)",
        method: "function getAllCollections() external view returns(address[] memory)",
        params: [],
    });
}

export async function getCollectionAddress(index: string){
    return await readContract({
        contract: contractFactory,
        method: "function getCollection(uint _index) public view returns(address)",
        params: [ethers.toBigInt(index)],
    });
}