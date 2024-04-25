import { MoonPayBuyWidget } from '@moonpay/moonpay-react';

const BuyWithMoonpay = ({ visible }: { visible: boolean }) => {
    return (
        <MoonPayBuyWidget
            variant="overlay"
            baseCurrencyCode="usd"
            baseCurrencyAmount="100"
            defaultCurrencyCode="eth"
            visible={visible}
        />
    );
}

export default BuyWithMoonpay;