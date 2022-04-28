import { Big } from 'big.js/big';
import { utils } from 'near-api-js';


const NEAR_FRACTIONAL_DIGITS = 5;

export const formatTokenAmount = (value, decimals = 18, precision = 2) => value && typeof value !== 'object' 
? Big(value).div(Big(10).pow(decimals)).toFixed(precision)
: 0;
export const parseTokenAmount = (value, decimals = 18) => value && value && typeof value !== 'object' 
? Big(value).times(Big(10).pow(decimals)).toFixed()
: 0;

export const formatNearAmount = (amount) => {
    if (typeof amount === "object") {
        return "0";
    }
    amount = amount?.toString();

    if (amount === '0') {
        return amount;
    }
    let formattedAmount = utils.format.formatNearAmount(amount, NEAR_FRACTIONAL_DIGITS);
    if (formattedAmount === '0') {
        return `< ${!NEAR_FRACTIONAL_DIGITS ? '0' : `0.${'0'.repeat((NEAR_FRACTIONAL_DIGITS || 1) - 1)}1`}`;
    }
    return formattedAmount;
};
