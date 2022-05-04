import React from 'react';

import FormButton from '../common/FormButton';
import { exchangeRateTranslationFromHash } from '../helpers';
import ImageContainer from '../ImageContainer';
import TextInfoSuccess from '../TextInfoSuccess';

const Success = ({
    inputValueFrom,
    symbol,
    multiplier,
    handleBackToSwap,
    onClickGoToExplorer,
    errorFromHash
}) => {
  return (
    <>
        {!errorFromHash && <ImageContainer />}
        <TextInfoSuccess
            errorFromHash={errorFromHash}
            valueFrom={inputValueFrom}
            valueTo={exchangeRateTranslationFromHash({
                method: symbol,
                balance: + inputValueFrom,
                exchangeRate: +multiplier / 10000
            })}
            symbol={symbol}
        />
        <div className="buttons-bottom-buttons">
            <FormButton
                type="submit"
                color='dark-gold'
                data-test-id="sendMoneyPageSubmitAmountButton"
                onClick={handleBackToSwap}
            >
                {/* <Translate id="button.backToSwap" /> */}
                <>Back To Swap</>
            </FormButton>
            {!errorFromHash && 
                <FormButton
                onClick={onClickGoToExplorer}
                type="button"
                className="link"
                color='dark-gold'
                linkTo="/"
            >
                <>View on Explorer</>
            </FormButton>
            }
        </div>
    </>      
  );
};

export default Success;
