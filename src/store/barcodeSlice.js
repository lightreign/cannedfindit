import { createSlice } from "@reduxjs/toolkit";

const barcodeSlice = createSlice({
  name: "barcode",
  initialState: {
    value: null,
  },
  reducers: {
    barcodeScanned: (state, action) => {
      state.value = action.payload;
    },
    clearBarcode: (state) => {
      state.value = null;
    },
  },
});

export const { barcodeScanned, clearBarcode } = barcodeSlice.actions;

export default barcodeSlice.reducer;