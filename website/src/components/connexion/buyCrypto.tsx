import { MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { useActiveAccount } from "thirdweb/react";

const BuyWithMoonpay = ({ visible }: { visible: boolean }) => {
    const account = useActiveAccount();
    
    return (
        <MoonPayBuyWidget
            variant="overlay"
            baseCurrencyCode="eur"
            defaultCurrencyCode="eth"
            walletAddress={account?.address}
            visible={visible}
        />
    );
}

export default BuyWithMoonpay;