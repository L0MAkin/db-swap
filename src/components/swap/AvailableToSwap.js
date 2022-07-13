import React from 'react';
import styled from 'styled-components';

import { formatNearAmount, formatTokenAmount } from './formatToken';

const StyledAvailableContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-top: 12px;

    .textContainer {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 350px;
    }

    span {
        color: #71BA92;
        cursor: pointer;
    }

    .useMaxButton {
        color: #fff;

        :hover {
            color: #C1B583;
        }
    }
`;

function AvailableToSwap({ balance, symbol, decimals, onClick, isUSN }) {
    const amountToShow = balance && formatNearAmount(balance);

    return (
        <StyledAvailableContainer>
            <div className="textContainer">
                <div>
                    <>Balance</>{' '}
                    <span>
                    {balance && (
                        <>
                            {' '}
                            {symbol === 'NEAR' ? amountToShow : formatTokenAmount(balance, decimals)}
                        </>
                    )}
                        {!balance && <span className="dots"/>}
                        {' '}
                        <>{symbol}</>
                </span>
                </div>
                <div>
                 {!isUSN && onClick && 
                    <span
                        onClick={() => onClick(symbol === 'NEAR' ? amountToShow : formatTokenAmount(balance, decimals))}
                        className="useMaxButton"
                    >
                        <>Use Max</>
                    </span>
                 }   
                </div>
            </div>
        </StyledAvailableContainer>
    );
}

export default AvailableToSwap;
