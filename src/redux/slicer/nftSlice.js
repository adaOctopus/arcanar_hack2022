import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setCreator: (state, action) => {
      state.founderName = action.payload;
    },
    setProject: (state, action) => {
      state.projectName = action.payload;
    },
    setProjDescription: (state, action) => {
      state.projectDescription = action.payload;
    },
    setHashingCode: (state, action) => {
      state.cryptoHash = action.payload;
    },
    setProjIndustry: (state, action) => {
      state.projIndustry = action.payload;
    },
    setProjLink: (state, action) => {
      state.projLink = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCreator,
  setProject,
  setProjDescription,
  setHashingCode,
  setProjIndustry,
  setProjLink
} = nftSlice.actions;

export default nftSlice.reducer;
