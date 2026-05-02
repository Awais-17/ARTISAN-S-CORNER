import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductState {
  products: any[];
  product: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: true,
  error: null,
};

export const getProducts = createAsyncThunk('product/getProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const getProduct = createAsyncThunk('product/getProduct', async (id: string, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
