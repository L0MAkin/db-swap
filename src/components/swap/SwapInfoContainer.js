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
        return `0 ${symbol}`;
    }

    if (!tradingFee) {
        return `0 ${symbol}`;
    }

    if (!amount) {
        return `0 ${symbol}`;
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
   percent,
   min,
   expected,
   rate
}) {
    const isNear = token === 'NEAR';
    const expectedPrice = isNear
        ? +amount * exchangeRate
        : +amount / exchangeRate;
    const symbol = !isNear ? 'NEAR' : 'USN';
    const slicePrice = expectedPrice?.toFixed(5).length > 17 ? expectedPrice.toString().slice(0, 17) + '...' : expectedPrice?.toFixed(5)
    const sliceAmount = amount.length > 10 ? amount.slice(0, 10) + '...' : amount
    
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
                rightText={`1 ${isNear ? 'NEAR' : 'USN'} = ${pairPrice(isNear, rate)} ${symbol}`}
                // rightText={`1 ${isNear ? 'NEAR' : 'USN'} = ${rate}`}
            />
            <SwapInfoItem
                leftText={'Expected price'}
                rightText={`${sliceAmount} ${token} = ${expected} ${symbol}`}
            />
            <SwapInfoItem
                isDots={isLoading}
                leftText={'Trading fee'}
                rightText={formatAmount({
                    amount,
                    symbol,
                    tradingFee,
                    value: `${percent}% / ${tradingFee}`,
                })}
            />
            <SwapInfoItem
                isDots={isLoading}
                leftText={'Minimum received'}
                // rightText={formatAmount({
                //     amount,
                //     symbol,
                //     tradingFee,
                //     value: MinimumReceived({ token: symbol, balance: amount, exchangeRate }) - tradingFee,
                // })}
                rightText={amount ? `${min} ${symbol}` : `0 ${symbol}`}
            />
        </StyledContainer>
    );
}

export default SwapInfoContainer;
