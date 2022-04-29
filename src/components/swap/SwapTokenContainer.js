import React, { useRef } from 'react';
import styled from 'styled-components';

import TokenIcon from './TokenIcon';
import { formatNearAmount, formatTokenAmount } from './formatToken';
import { exchangeRateTranslation } from './helpers';

const { REACT_APP_NEAR_ENV } = process.env;
const EXPLORER_URL = REACT_APP_NEAR_ENV === 'testnet' ? 'https://near-contract-helper.onrender.com': 'https://helper.mainnet.near.org';


const SwapContainer = styled.div`
    width: 311px;
    height: 60px;
    background: #FEFDEE;
    border: 1px solid #2A2B34;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 16px 20px;
    &.error {
        border: 1px solid #ec6563;
    }

    input {
        text-align: right;
        padding-right: 3px;
        height: auto;
        border: 0;
        background-color: #FEFDEE;
        width: 150px;
        margin-left: auto;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #252729;
        margin-bottom: 10px;
    }

    .exchange {
        text-align: right;
        padding: 0;
        height: auto;
        border: 0;
        background-color: #FEFDEE;
        width: fit-content;
        margin-left: auto;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #252729;
    }

    .inputError {
        color: #ec6563;
    }

    .symbolFlex {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    }
    .icon {
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        align-self: center;
        

        img,
        svg {
            height: 32px;
            width: 32px;
        }
    }

    .desc {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 5px;
        display: block;
        min-width: 0;

        .symbol {
            font-weight: 700;
            font-size: 16px;
            color: #24272a;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            margin-right: 10px;

            a {
                color: inherit;
            }
        }
    }
`;

const SwapTokenContainer = ({
    fromToToken,
    value,
    setInputValueFrom,
    multiplier,
}) => {
    const inputRef = useRef(null);
    const balance =
        fromToToken?.onChainFTMetadata?.symbol === 'NEAR'
            ? +formatNearAmount(fromToToken?.balance)
            : +formatTokenAmount(
                  fromToToken?.balance,
                  fromToToken?.onChainFTMetadata?.decimals,
                  5
              );

    const error = setInputValueFrom && balance < +value;
    const formatMultiplier = +multiplier / 10000;
    const handleChange = (e) => {
        const { value } = e.target;
        setInputValueFrom(value.replace(/[^.\d,]/g, ''));
    };

    const onFocus = () => {
        if (setInputValueFrom) {
            inputRef.current.focus();
        }
    };

    return (
        <SwapContainer className={error ? 'error' : ''} onClick={onFocus}>
            <div className="symbolFlex">
                <div className="icon">
                    <TokenIcon
                        symbol={fromToToken?.onChainFTMetadata?.symbol}
                        icon={fromToToken?.onChainFTMetadata?.icon}
                    />
                </div>
                <div className="desc">
                    {fromToToken?.contractName ? (
                        <span
                            className="symbol"
                            title={fromToToken?.contractName}
                        >
                            <a
                                href={`${EXPLORER_URL}/accounts/${fromToToken?.contractName}`}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {fromToToken?.onChainFTMetadata?.name ||
                                    fromToToken?.onChainFTMetadata?.symbol}
                            </a>
                        </span>
                    ) : (
                        <span className="symbol">
                            {fromToToken?.onChainFTMetadata?.symbol === 'NEAR' ? 'NEAR' : 'USN'}
                        </span>
                    )}
                </div>
                {setInputValueFrom ? (
                    <input
                        ref={inputRef}
                        type="text"
                        autoFocus
                        placeholder='0'
                        value={value}
                        onChange={handleChange}
                        className={error ? 'inputError' : ''}
                    />
                ) : multiplier && fromToToken ? (
                    <div className="exchange">
                        ≈
                        <>
                            {exchangeRateTranslation({
                                token: fromToToken,
                                balance: + value,
                                exchangeRate: formatMultiplier
                            })?.toFixed(5)}
                        </>
                    </div>
                ) : null}
            </div>
        </SwapContainer>
    );
};

export default SwapTokenContainer;
