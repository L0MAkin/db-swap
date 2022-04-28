import { combineReducers } from 'redux';

import tokensSlice from './slices/tokens';
import nearBalanceSlice from './slices/near'
import multiplierSlice from './slices/multiplier'



export default () => combineReducers({
    [tokensSlice.name]: tokensSlice.reducer,
    [nearBalanceSlice.name]: nearBalanceSlice.reducer,
    [multiplierSlice.name]: multiplierSlice.reducer
});
