import * as nearApiJs from 'near-api-js';
import { useState } from 'react';
import { formatTokenAmount, parseTokenAmount } from '../components/swap/formatToken';

const { REACT_APP_NEAR_ENV } = process.env;
const IS_MAINNET = REACT_APP_NEAR_ENV === 'mainnet' ? true : false;
const usnContractName = !IS_MAINNET ? 'usdn.testnet' : 'usn';
const usdtContractName = !IS_MAINNET ? 'usdt.fakes.testnet' : 'usdt';

const ONE_YOCTO_NEAR = '1';
const GAS_TO_CALL_WITHDRAW = '';
const GAS_FOR_CALL = '200000000000000'; // 200 TGas

const setArgsUSNContractWithdraw = (amount) => {
    return {
        args: {
            amount: parseTokenAmount(amount, 18)
        },
        amount: ONE_YOCTO_NEAR,
        gas: GAS_FOR_CALL,
    };
};

const setArgsUSDTContractTransfer = (amount) => {
    return {
        args: {
            receiver_id:usnContractName,
            amount: parseTokenAmount(amount, 6),
            msg: '',
        },
        amount: ONE_YOCTO_NEAR,
        gas: GAS_FOR_CALL,
    };
};

export const useFetchByorSellUSN = (account) => {
    const [isLoading, setIsLoading] = useState(false);
    const usnMethods = {
        viewMethods: ['version', 'name', 'symbol', 'decimals', 'ft_balance_of'],
        changeMethods: ['withdraw'],
    };

    const usdtMethods = {
        changeMethods: ['ft_transfer_call'],
    };

    const fetchByOrSell = async (
        accountId,
        amount,
        symbol,
        usnAmount
    ) => {
        if (symbol === 'USDT') {
            const usdtContract = new nearApiJs.Contract(
                account,
                usdtContractName,
                usdtMethods
            );
            await usdtContract.ft_transfer_call(setArgsUSDTContractTransfer(amount));
        } else {
            const usnContract = new nearApiJs.Contract(
                account,
                usnContractName,
                usnMethods
            );
            await usnContract.withdraw(setArgsUSNContractWithdraw(amount));
        }
    };

    return { fetchByOrSell, isLoading, setIsLoading};
};
