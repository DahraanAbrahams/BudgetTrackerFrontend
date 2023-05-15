import { getAllTransactions, hideLoading, showLoading } from "../allTransactions/allTransactionsSlice";
import customFetch from '../../utils/axios';
// import axios from "axios";
import { clearValues } from "./transactionSlice";
import { checkForUnauthorizedResponse } from "../../utils/axios";

export const createTransactionThunk = async (transaction, thunkAPI) => {
    try {
      const response = await customFetch.post('/transactions', transaction);
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);    }
};
  
export const deleteTransactionThunk = async (transactionId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const response = await customFetch.delete(`/transactions/${transactionId}`);
      thunkAPI.dispatch(getAllTransactions());
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
};
  
export const editTransactionThunk = async ({ transactionId, transaction }, thunkAPI) => {
    console.log(transactionId, transaction)
    try {
      const response = await customFetch.patch(`/transactions/${transactionId}`, transaction);
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };