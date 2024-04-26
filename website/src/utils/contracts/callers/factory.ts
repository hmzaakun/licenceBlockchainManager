import { prepareContractCall, toWei, sendTransaction, waitForReceipt } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { contractFactory } from "../variables";
import { ethers } from "ethers";
import { client } from "../variables";

async function create_wallet() {
    const wallet = createWallet("io.metamask");
    // connect the wallet, this returns a promise that resolves to the connected account
    const account = await wallet.connect({
        // pass the client you created with `createThirdwebClient()`
        client,
    });
    return account;
}

export async function createLicenseCollection(caller: string, name: string, symbol: string, mintPrice: string, maxSupply: number, URI: string) {
    try {
        const account = await create_wallet();
        const tx = prepareContractCall({
            contract: contractFactory,
            method: "function createLicenseCollection(string memory _name,string memory _symbol,uint256 _mintPrice,uint _maxSupply,string memory _URI,address _dest) public",
            params: [name, symbol, toWei(mintPrice), ethers.toBigInt(maxSupply), URI, caller]
        });
        const transactionResult = await sendTransaction({
            transaction: tx,
            account
        });
        const receipt = await waitForReceipt(transactionResult);
        return receipt;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function mintCollection(caller: string, id: string, value: string) {
    try {
        const account = await create_wallet();
        const tx = prepareContractCall({
            contract: contractFactory,
            method: "function mintCollection(uint _index, address _to) public payable",
            params: [ethers.toBigInt(id), caller],
            value: toWei(value)
        });
        const transactionResult = await sendTransaction({
            transaction: tx,
            account
        });
        const receipt = await waitForReceipt(transactionResult);
        return receipt;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function claim(caller: string) {
    try {
        const account = await create_wallet();
        const tx = prepareContractCall({
            contract: contractFactory,
            method: "function claim(address _caller) public",
            params: [caller]
        });
        const transactionResult = await sendTransaction({
            transaction: tx,
            account
        });
        const receipt = await waitForReceipt(transactionResult);
        return receipt;
    } catch (error) {
        console.error(error);
        return null;
    }
}