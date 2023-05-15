import customFetch from '../../utils/axios';
// import axios from "axios";
import { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllTransactionsThunk = async (_, thunkAPI) => {
    const { search, type, sort, page } = thunkAPI.getState().allTransactions;
    let url = `/transactions/showAllMyTransactions?transactionType=${type}&sort=${sort}&page=${page}`;
    if (search) { 
      url = url + `&search=${search}`
    }
    try {
      const response = await customFetch.get(url);
      // console.log(response.data)
      return response.data;
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI);    }
  }