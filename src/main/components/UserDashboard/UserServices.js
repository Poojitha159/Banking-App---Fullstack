
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/api';

// Function to get customer details
export const getCustomerDetails = async (customerId, authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/${customerId}/details`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get customer total balance
export const getCustomerTotalBalance = async (customerId, authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/${customerId}/totalBalance`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get account numbers
export const getAccountNumbers = async (customerId, authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get account balance by accountId
export const getAccountBalance = async (accountId, authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/${accountId}/balance`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch transactions
export const fetchTransactions = async (customerId, authToken, page, startDate, endDate) => {
  try {
    const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : '';

    let url = `${API_BASE_URL}/customers/${customerId}/passbook?page=${page - 1}`;
    if (formattedStartDate && formattedEndDate) {
      url += `&startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
