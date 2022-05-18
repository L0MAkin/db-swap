import React, { useRef } from 'react';
import styled from 'styled-components';

import TokenIcon from './TokenIcon';
import { formatNearAmount, formatTokenAmount } from './formatToken';
import { exchangeRateTranslation } from './helpers';

const { REACT_APP_NEAR_ENV } = process.env;
const EXPLORER_URL = REACT_APP_NEAR_ENV === 'testnet' ? 'https://near-contract-helper.onrender.com': 'https://helper.mainnet.near.org';


const SwapContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    input {
        text-align: right;
        padding-right: 3px;
        height: auto;
        border: 0;
        background-color: #FEFDEE;
        width: 100%;
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
        box-sizing: border-box;
    }

    .symbolContainer {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-width: 100px;
    }

    .inputContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 350px;
        height: 60px;
        padding-right: 20px;
        background-color: #FEFDEE;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        align-self: center;
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
            color: #ffffff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;

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
                <div className="symbolContainer">
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
                </div>
                <div className="inputContainer">
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
                                exchangeRate: +multiplier
                            })?.toFixed(5)}
                        </>
                    </div>
                ) : null}
                </div>
            </div>
        </SwapContainer>
    );
};

export default SwapTokenContainer;
