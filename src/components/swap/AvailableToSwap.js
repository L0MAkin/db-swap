import React from 'react';
import styled from 'styled-components';

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
    margin-top: 12px;

    span {
        color: #71BA92;
        cursor: pointer;
    }

    .useMaxButton {
        color: #fff;
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
                <span
                    onClick={() => onClick(symbol === 'NEAR' ? amountToShow : formatTokenAmount(balance, decimals, 5))}
                    className="useMaxButton"
                >
                     <>Use Max</>
                </span>
            </div>
        </StyledAvailableContainer>
    );
}

export default AvailableToSwap;
