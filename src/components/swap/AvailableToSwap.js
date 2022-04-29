import React from 'react';
import styled from 'styled-components';


import FormButton from './common/FormButtun';
import { formatNearAmount, formatTokenAmount } from './formatToken';

const StyledAvailableContainer = styled.div`
    display: flex;
    padding-left: 4px;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    max-width: 311px;
    margin-top: 5px;
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 15px;

    span {
        color: green;
        cursor: pointer;
    }
`;

function AvailableToSwap({ balance, symbol, decimals, onClick }) {
    const amountToShow = balance && formatNearAmount(balance);

    return (
        <StyledAvailableContainer>
            <div>
                <>Available to swap</>{' '}
                <span>
                    {balance && (
                        <>
                            {' '}
                            {symbol === 'NEAR' ? amountToShow : formatTokenAmount(balance, decimals, 5)}
                        </>
                    )}
                    {!balance && <span className="dots"/>}
                    {' '}
                    <>{symbol}</>
                </span>
            </div>
            <div>
                <FormButton
                    swapButton={true}
                    onClick={() => onClick(symbol === 'NEAR' ? amountToShow : formatTokenAmount(balance, decimals, 5))}
                    type='button'
                    color='light-blue'
                    className='small rounded'
                >
                     <>Use Max</>
                </FormButton>
            </div>
        </StyledAvailableContainer>
    );
}

export default AvailableToSwap;
