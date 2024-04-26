import { prepareContractCall, toWei, sendTransaction, waitForReceipt, getContract } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { ethers } from "ethers";
import { client } from "../variables";
import { sepolia } from "thirdweb/chains";

async function create_wallet() {
    const wallet = createWallet("io.metamask");
    // connect the wallet, this returns a promise that resolves to the connected account
    const account = await wallet.connect({
        // pass the client you created with `createThirdwebClient()`
        client,
    });
    return account;
}

const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.REACT_APP_PROXY_CONTRACT!,
});

export async function testProxy(number: number) {
    try {
        const account = await create_wallet();
        const tx = prepareContractCall({
            contract: contract,
            method: "function testProxy(uint number) public returns (bool)",
            params: [ethers.toBigInt(number)],
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