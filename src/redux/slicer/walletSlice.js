import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: null,
  loggedMetamask: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: initialState
  },
  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload
    },
    logoutWallet: (state) => {
      state.walletAddress = initialState.walletAddress;
      state.loggedMetamask = initialState.loggedMetamask;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWallet, logoutWallet } = walletSlice.actions;

export default walletSlice.reducer;
