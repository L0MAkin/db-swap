import React from 'react';
// import { Translate } from 'react-localize-redux';

const TextInfoSuccess = ({ valueFrom, valueTo, symbol, errorFromHash }) => {
    const isNear = symbol === 'buy';
    const NEAR = 'NEAR';
    const USN = 'USN';

    return !errorFromHash 
       ? <div className="text_info_success">
            <>
               <>Transaction complete!</>
            </>
            <br />
            <>
                <>You swap</> {valueFrom}{' '}
                {isNear ? NEAR : USN}
            </>
            <br />
            <>
                <>To</>  {valueTo} {isNear ? USN : NEAR}
            </>
        </div>
        : <div className="text_info_success">
        <>
           <>Oops! Something went wrong.</>
        </>
        <br />
        <br />
        <>
            <div>{errorFromHash}</div>
        </>
    </div>
    
};

// const comparisonFn = (prev, next) => prev.valueTo !== next.valueTo;

export default TextInfoSuccess;
