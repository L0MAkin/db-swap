import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Container from './common/Container';
import { currentToken } from './helpers';
import Success from './views/Success';
import SwapPage from './views/SwapPage';


import { actions } from '../../redux/slices/tokens';
import { fetchNearBalance } from '../../redux/slices/near';
import { useNearWallet } from 'react-near';
import { useLocation, useNavigate } from 'react-router';
import { formatNearAmount, formatTokenAmount } from './formatToken';

const { REACT_APP_NEAR_ENV } = process.env;

const explorerUrl = REACT_APP_NEAR_ENV === 'testnet' ? 'https://explorer.testnet.near.org' : 'https://explorer.mainnet.near.org'

const { fetchTokens } = actions;


export const VIEWS_SWAP = {
    MAIN: 'main',
    SUCCESS: 'success'
};

const StyledContainer = styled(Container)`
    position: relative;

    .wrap {
        position: relative;
        height: 60px;
    }

    h1 {
        text-align: center;
        margin-bottom: 30px;
    }

    .text {
        margin-bottom: 11px;
        text-align: left;
    }

    .iconSwapContainer {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 50%;
        margin: 20px 0;

        .iconSwap{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            z-index: 1;

            :hover {
                box-shadow: 0px 0px 1px 2px #ffffff;
            }
        }

        .iconSwapDivider {
            width: 100%;
            top: -25px;
            border-bottom: solid 1px #fff;
            position: relative;
            z-index: 0;
        }

        svg {
            /* margin: 2px 0px 2px 10px; */
            z-index: 10;
            cursor: pointer;
            :hover {
                path {
                    fill: #C1B583;
                   
                }
            }

            #left {
                position: absolute;
                z-index: 10;
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
        color: #fff;
        margin: 0 auto;

        > div {
            width: 100%;
            background: #efefef;
            padding: 5px;
            color: gray;
            font-weight: 400;
        }
    }
`;

const formatDeposit = (method, res) => {
    return method === 'buy' 
    ? formatNearAmount(res.transaction.actions[0].FunctionCall.deposit) 
    : formatTokenAmount(JSON.parse(atob(res.transaction.actions[0].FunctionCall.args)).amount, 18, 0)
}

const formatError = (value) => {
    return JSON.stringify(value);
}

const currentMultiplier = (symbol, method, a, b) => {
    return symbol === 'NEAR' && method === 'buy' ? Math.max(a, b).toFixed(4) : Math.min(a, b).toFixed(4);
}


const SwapAndSuccessContainer = ({
    fungibleTokensList,
    accountId,
    multipliers,
}) => {
    const [from, setFrom] = useState(fungibleTokensList[0]);
    const [to, setTo] = useState({ onChainFTMetadata: {symbol: 'USN'}, balance: '0'});
    const [inputValueFrom, setInputValueFrom] = useState('');
    const [activeView, setActiveView] = useState(VIEWS_SWAP.MAIN);
    const [methodFromHash, setMethodFromHash] = useState('buy')
    const [errorFromHash, setErrorFromHash] = useState('')
    const [deposit, setDeposit] = useState('')
    const [multiplierFromHash, setMultiplierFromHash] = useState(0)
    const wallet = useNearWallet();
    const dispatch = useDispatch()
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const transactionHash = params.get('transactionHashes') || ''
    const navigate = useNavigate()

    const multiplier = currentMultiplier(from?.onChainFTMetadata?.symbol, methodFromHash, multipliers.spot, multipliers.twap)

    useEffect(() => {
        setFrom(currentToken(fungibleTokensList, from?.onChainFTMetadata?.symbol));
        if(accountId) {
            setTo(currentToken(fungibleTokensList, to?.onChainFTMetadata?.symbol || 'USN'));
        }
    }, [fungibleTokensList]);

    useEffect(() => {
        const getHash = async (hash) => {
            try {
                const res = await wallet._near.connection.provider.txStatus(hash, wallet.getAccountId())
                if(typeof res.status.SuccessValue === 'string' || typeof res.status.SuccessReceiptId === 'string') {
                setMethodFromHash(res.transaction.actions[0].FunctionCall.method_name)
                setDeposit(formatDeposit(res.transaction.actions[0].FunctionCall.method_name, res))
                setMultiplierFromHash(JSON.parse(atob(res.transaction.actions[0].FunctionCall.args)).expected.multiplier)
                setActiveView('success')
            }   
                if(res.status.Failure) {
                    setErrorFromHash(formatError(res.status.Failure?.ActionError))
                    setActiveView('success')
                }
            } catch (e) {
                setErrorFromHash(formatError(e.message))
                setActiveView('success')
            }
        }

        if(wallet && transactionHash) {
            getHash(transactionHash)
        }
        
    },[search, wallet])


    const onHandleBackToSwap = useCallback(async () => {
        await dispatch(fetchTokens({ accountId }));
        await dispatch(fetchNearBalance(accountId))
        navigate('/swap')
        setActiveView('main');
    }, []);
    
    return (
        <StyledContainer className='small-centered'>
            {activeView === VIEWS_SWAP.MAIN && (
                <SwapPage
                    setActiveView={setActiveView}
                    setErrorFromHash={setErrorFromHash}
                    accountId={accountId}
                    from={from}
                    inputValueFrom={inputValueFrom}
                    multiplier={multiplier}
                    setInputValueFrom={setInputValueFrom}
                    to={to}
                    onSwap={() => {

                        if (from?.onChainFTMetadata?.symbol === 'NEAR') {
                            setFrom(accountId 
                                ? currentToken(fungibleTokensList, 'USN') 
                                : { onChainFTMetadata: {symbol: 'USN'}, balance: '0'});
                            setTo(fungibleTokensList[0]);
                        } else {
                            setFrom(fungibleTokensList[0]);
                            setTo(accountId 
                                ? currentToken(fungibleTokensList, 'USN') 
                                : { onChainFTMetadata: {symbol: 'USN'}, balance: '0'});
                        }
                    }}
                />
            )}
            {activeView === VIEWS_SWAP.SUCCESS && (
                <Success
                    errorFromHash={errorFromHash}
                    onClickGoToExplorer={() => window.open(`${explorerUrl}/transactions/${transactionHash}`, '_blank')}
                    inputValueFrom={deposit}
                    symbol={methodFromHash}
                    multiplier={multiplierFromHash ? +multiplierFromHash / 10000: multiplier}
                    handleBackToSwap={async () => {
                        setInputValueFrom('');
                        await onHandleBackToSwap();
                    }}
                />
            )}
        </StyledContainer>
    );
};

export default SwapAndSuccessContainer;
