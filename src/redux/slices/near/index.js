import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import merge from 'lodash.merge';
import { createSelector } from 'reselect';

import { wallet } from '../../../utils/wallet';
import initialStatusState from '../../reducerStatus/initialState/initialStatusState';



const SLICE_NAME = 'near';

const initialState = {
    ...initialStatusState,
    nearBalance: {},
};

export const fetchNearBalance = createAsyncThunk(
    `${SLICE_NAME}/fetchNearBalance`,
    async function (accountId) {
        try {
            const response = await wallet.getBalance(accountId)

            return response
        } catch (error) {
            console.warn('Failed to load ', error);
        }
    }
);

const nearBalanceSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNearBalance.fulfilled, (state, action) => {
            merge(state.nearBalance, action.payload);
        });
    },
});

export default nearBalanceSlice;

export const reducer = nearBalanceSlice.reducer;

const selectmultiplierSlice = (state) => state[SLICE_NAME];

const selectNear = createSelector(
    selectmultiplierSlice,
    ({ nearBalance }) => nearBalance || {}
);

export const selectMetadataSlice = createSelector(
    selectNear,
    (nearBalance) => nearBalance.available || {}
);