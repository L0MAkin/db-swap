import React from 'react';
import styled from 'styled-components';

import { MinimumReceived } from './helpers';
import SwapInfoItem from './SwapInfoItem';

const pairPrice = (isNear, exchangeRate) => {
    const price = isNear ? 1 * exchangeRate : 1 / exchangeRate;
    return price?.toFixed(5);
};

const StyledContainer = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

function formatAmount({ amount, symbol, tradingFee, value }) {
    if (!amount && !tradingFee) {
        return `${amount} ${symbol}`;
    }

    if (!tradingFee) {
        return `- ${symbol}`;
    }

    return `${value} ${symbol}`;
}

function SwapInfoContainer({
   exchangeRate,
   amount,
   token,
   setSlippageValue,
   slippageValue,
   slippageError,
   tradingFee,
   isLoading,
   percent
}) {
    const isNear = token === 'NEAR';
    const expectedPrice = isNear
        ? +amount * exchangeRate
        : +amount / exchangeRate;
    const symbol = !isNear ? 'NEAR' : 'USN';

    return (
        <StyledContainer>
            <SwapInfoItem
                leftText="Slippage tolerance"
                slippageError={slippageError}
                slippageValue={slippageValue}
                setSlippageValue={setSlippageValue}
            />
            <SwapInfoItem
                leftText={'Pair price'}
                rightText={`1 ${isNear ? 'NEAR' : 'USN'} = ${pairPrice(isNear, exchangeRate)} ${symbol}`}
            />
            <SwapInfoItem
                leftText={'Expected price'}
                rightText={`${amount} ${token} = ${expectedPrice?.toFixed(5)} ${symbol}`}
            />
            <SwapInfoItem
                isDots={isLoading}
                leftText={'Trading fee'}
                rightText={formatAmount({
                    amount,
                    symbol,
                    tradingFee,
                    value: `${percent}% / ${tradingFee?.toFixed(5)}`,
                })}
            />
            <SwapInfoItem
                isDots={isLoading}
                leftText={'Minimum received'}
                rightText={formatAmount({
                    amount,
                    symbol,
                    tradingFee,
                    value: MinimumReceived({ token: symbol, balance: amount, exchangeRate }) - tradingFee,
                })}
            />
        </StyledContainer>
    );
}

export default SwapInfoContainer;
