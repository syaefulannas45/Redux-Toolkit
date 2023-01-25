import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await axios.get("http://localhost:5000/product");
  return response.data;
});

export const deleteProducts = createAsyncThunk("products/deleteProducts", async (id) => {
  await axios.delete(`http://localhost:5000/product/${id}`);
  return id;
});

export const saveProducts = createAsyncThunk("products/saveProducts", async (product) => {
  const response = await axios.post("http://localhost:5000/product", product);
  return response.data;
});

export const updateProducts = createAsyncThunk("products/updateProducts", async ({ id, ...product }) => {
  const response = await axios.put(`http://localhost:5000/product/${id}`, product);
  return response.data;
});

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const ProductSlice = createSlice({
  name: "Product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [saveProducts.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [deleteProducts.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
    [updateProducts.fulfilled]: (state, action) => {
      productEntity.updateOne(state, { id: action.payload.id, updates: action.payload });
    },
  },
});

export const productSelectors = productEntity.getSelectors((state) => state.product);
export default ProductSlice.reducer;
