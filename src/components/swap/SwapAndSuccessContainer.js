import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Container from './common/Container';
import { currentToken } from './helpers';
import Success from './views/Success';
import SwapPage from './views/SwapPage';


import { actions } from '../../redux/slices/tokens';
import { fetchNearBalance } from '../../redux/slices/near';

const { fetchTokens } = actions;
 

export const VIEWS_SWAP = {
    MAIN: 'main',
    SUCCESS: 'success'
};

const StyledContainer = styled(Container)`
    position: relative;
    .wrap {
        position:relative;
    }

    h1 {
        text-align: center;
        margin-bottom: 30px;
    }
    .text {
        margin-bottom: 11px;
        text-align: left;
    }

    .iconSwap {
        margin: 0 auto;
        width: fit-content;
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 9px 10px 5px 5px;
        border-radius: 50%;
        border: 1px solid #3170c7;

        :hover {
            box-shadow: 0px 0px 1px 4px #D6EDFF;
            svg {
                g, path {
                    stroke: #0072ce;
                    fill: #0072ce;
                }
            }
        }

        svg {
            transform: rotate(90deg);
            cursor: pointer;

            g:hover {
                stroke: #0072ce;
                fill: #0072ce;
            }
        }
    }

    .buttons-bottom-buttons {
        margin-top: 30px;

        > button {
            display: block;
            width: 100%;
        }

        .link {
            display: block !important;
            margin: 20px auto !important;
        }
    }

    .text_info_success {
        width: fit-content;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
        color: #252729;
        margin: 0 auto;
    }
`;


const SwapAndSuccessContainer = ({
    fungibleTokensList,
    accountId,
    multiplier,
}) => {
    const [from, setFrom] = useState(fungibleTokensList[0]);
    const [to, setTo] = useState({ onChainFTMetadata: {symbol: 'USN'}, balance: 0});
    const [inputValueFrom, setInputValueFrom] = useState('');
    const [activeView, setActiveView] = useState(VIEWS_SWAP.MAIN);
    const dispatch = useDispatch()

    useEffect(() => {
        setFrom(currentToken(fungibleTokensList, from?.onChainFTMetadata?.symbol));
        if(accountId) {
            setTo(currentToken(fungibleTokensList, to?.onChainFTMetadata?.symbol || 'USN'));
        }
    }, [fungibleTokensList]);


    const onHandleBackToSwap = useCallback(async () => {
        await dispatch(fetchTokens({ accountId }));
        await dispatch(fetchNearBalance(accountId))
        setActiveView('main');
    }, []);

    return (
        <StyledContainer className='small-centered'>
            {activeView === VIEWS_SWAP.MAIN && (
                <SwapPage
                    setActiveView={setActiveView}
                    accountId={accountId}
                    from={from}
                    inputValueFrom={inputValueFrom}
                    multiplier={multiplier}
                    setInputValueFrom={setInputValueFrom}
                    to={to}
                    onSwap={() => {
                        if (to?.balance === '0' || !to?.balance) return;

                        if (from?.onChainFTMetadata?.symbol === 'NEAR') {
                            setFrom(currentToken(fungibleTokensList, 'USN'));
                            setTo(fungibleTokensList[0]);
                        } else {
                            setFrom(fungibleTokensList[0]);
                            setTo(currentToken(fungibleTokensList, 'USN'));
                        }
                    }}
                />
            )}
            {activeView === VIEWS_SWAP.SUCCESS && (
                <Success
                    inputValueFrom={inputValueFrom}
                    symbol={from.onChainFTMetadata?.symbol}
                    to={to}
                    multiplier={multiplier}
                    handleBackToSwap={async () => {
                        setInputValueFrom(0);
                        await onHandleBackToSwap();
                    }}
                />
            )}
        </StyledContainer>
    );
};

export default SwapAndSuccessContainer;
