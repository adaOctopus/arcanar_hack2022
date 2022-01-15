import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './slicer/walletSlice';
import nftReducer from './slicer/nftSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    nft: nftReducer,
  },
})