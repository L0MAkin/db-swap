import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';

import { fetchMultiplier } from '../../../redux/slices/multiplier';
import FormButton from '../common/FormButton';
import SwapIconTwoArrows from '../../../assets/svg/SwapIconTwoArrows';
import AvailableToSwap from '../AvailableToSwap';
import { formatNearAmount, formatTokenAmount } from '../formatToken';
import { commission } from '../helpers';
import Loader from '../Loader';
import SwapInfoContainer from '../SwapInfoContainer';
import SwapTokenContainer from '../SwapTokenContainer';
import { useFetchByorSellUSN } from '../../../hooks/fetchByorSellUSN';
import { useNearWallet } from 'react-near';

const { REACT_APP_NEAR_ENV } = process.env;
const contractId  = REACT_APP_NEAR_ENV === 'testnet' ? 'usdn.testnet' : 'usn'

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`

const balanceForError = (from) => {
    return from?.onChainFTMetadata?.symbol === 'NEAR'
        ? +formatNearAmount(from?.balance)
        : +formatTokenAmount(from?.balance, from?.onChainFTMetadata?.decimals, 5);
};

const SwapPage = ({
  from,
  to,
  inputValueFrom,
  setInputValueFrom,
  multiplier,
  accountId,
  onSwap,
  setActiveView,
  setErrorFromHash
}) => {
    const wallet = useNearWallet();
    const [isSwapped, setIsSwapped] = useState(false);
    const [slippageValue, setSlippageValue] = useState(1);
    const [usnAmount, setUSNAmount] = useState('');
    const { commissionFee, isLoadingCommission } = commission({
        accountId: wallet.account(),
        amount: inputValueFrom,
        delay: 500,
        exchangeRate: + multiplier,
        token: from,
        isSwapped,
    });
    const { fetchByOrSell, isLoading, setIsLoading } = useFetchByorSellUSN(wallet.account());
    const balance = balanceForError(from);
    const error = balance < +inputValueFrom || !inputValueFrom;
    const slippageError = slippageValue < 1 || slippageValue > 50;
    const currentMultiplier = +multiplier * 10000

    const onHandleSwapTokens = useCallback(async (accountId, multiplier, slippageValue, inputValueFrom, symbol, usnAmount) => {
        try {
            setIsLoading(true);
            await fetchByOrSell(accountId, multiplier, slippageValue, inputValueFrom, symbol, usnAmount);
            setActiveView('success');
        } catch (e) {
            setErrorFromHash(e.message);
            setActiveView('success');
            // dispatch(showCustomAlert({
            //     errorMessage: e.message,
            //     success: false,
            //     messageCodeHeader: 'error',
            // }));
            
            console.error(e.message)
        } finally {
            setIsLoading(false);
            // dispatch(checkAndHideLedgerModal());
        }
    }, []);

    const signIn = () => {
        wallet.requestSignIn({
            contractId: contractId
        })
        .catch(console.error);
    }
    

    return (
        <>
            {/*<div className='wrap'>*/}
            {/*    <Loader onRefreshMultiplier={() => dispatch(fetchMultiplier())}/>*/}
            {/*</div>*/}
            <StyledWrapper>
                <SwapTokenContainer
                fromToToken={from}
                value={inputValueFrom}
                setInputValueFrom={setInputValueFrom}
            />
                <AvailableToSwap
                    isUSN={false}
                    onClick={(balance) => {
                        setInputValueFrom(balance);
                        from?.onChainFTMetadata?.symbol === 'USN' && setUSNAmount(from?.balance);
                    }}
                    balance={from?.balance}
                    symbol={from?.onChainFTMetadata?.symbol}
                    decimals={from?.onChainFTMetadata?.decimals}
                />
                <div
                    className="iconSwapContainer"
                >
                    <div
                        className="iconSwap"
                        onClick={() => {
                            onSwap();
                            setIsSwapped((prev) => !prev);
                        }}
                    >
                        <SwapIconTwoArrows
                            width="23"
                            height="23"
                            color="#FFF"
                        />
                    </div>
                    <div className="iconSwapDivider"/>
                </div>
                <SwapTokenContainer
                fromToToken={to}
                multiplier={multiplier}
                value={inputValueFrom}
                />
                <AvailableToSwap
                    isUSN={true}
                    onClick={(balance) => {
                        setInputValueFrom(balance);
                        from?.onChainFTMetadata?.symbol === 'USN' && setUSNAmount(from?.balance);
                    }}
                    balance={to?.balance}
                    symbol={to?.onChainFTMetadata?.symbol}
                    decimals={to?.onChainFTMetadata?.decimals}
                />
            </StyledWrapper>
            <SwapInfoContainer
                slippageError={slippageError}
                slippageValue={slippageValue}
                setSlippageValue={setSlippageValue}
                token={from?.onChainFTMetadata?.symbol}
                exchangeRate={+multiplier}
                amount={inputValueFrom}
                tradingFee={commissionFee?.result}
                isLoading={isLoadingCommission}
                percent={commissionFee?.percent}
            />
            <div className="buttons-bottom-buttons">
                <FormButton
                    type="submit"
                    color='dark-gold'
                    disabled={!accountId ? false : error || slippageError || isLoading}
                    data-test-id="sendMoneyPageSubmitAmountButton"
                    onClick={() => accountId
                        ? onHandleSwapTokens(accountId, currentMultiplier.toString(), slippageValue, inputValueFrom, from?.onChainFTMetadata?.symbol, usnAmount)
                        : signIn()}
                    sending={isLoading}
                >
                  {accountId ? <>Continue</> : <>Connect to Wallet</>}
                </FormButton>
                {/* <FormButton
                    type="button"
                    className="link"
                    color="gray"
                    linkTo="/"
                >
                    <>Cancel</>
                </FormButton> */}
            </div>
        </>
    );
};

export default SwapPage;
