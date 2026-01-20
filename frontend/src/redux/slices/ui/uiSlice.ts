import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  globalLoading: number;
}

const initialState: UIState = {
  globalLoading: 0,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.globalLoading += 1;
    },
    stopLoading: (state) => {
      state.globalLoading = Math.max(0, state.globalLoading - 1);
    },
    resetLoading: (state) => {
      state.globalLoading = 0;
    },
  },
});

export const { startLoading, stopLoading, resetLoading } = uiSlice.actions;
