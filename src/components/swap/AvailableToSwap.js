import React from 'react';
import styled from 'styled-components';


import FormButton from './common/FormButtun';
import { formatNearAmount, formatTokenAmount } from './formatToken';

const StyledAvailableContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

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
