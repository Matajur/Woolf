import { createSlice } from "@reduxjs/toolkit";
import { fetchTestimonials } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, handlePending)
      .addCase(fetchTestimonials.fulfilled, (state, { payload }) => {
        state.testimonials = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTestimonials.rejected, handleRejected);
  },
});

export const testimonialsReducer = testimonialsSlice.reducer;
