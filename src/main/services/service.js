
import axios from "axios";
import { handleApiError } from "../../utils/Errors/HandleApiError";

// export const getCustomerById=async(customerId) => {
//     let accessToken=localStorage.getItem("authToken");
//     try{
//         const response=await axios.get(
//             `http://localhost:8080/api/accounts/${customerId}`,
//     {
//         headers:{
//             Authorization:`Bearer ${accessToken}`,
//         },
//     }

//         );
// console.log(response.data);
// return response.data;
//     }
//     catch(error){
//         console.error("no customer found");
//         throw error;
//     }
// };

export const getCustomerById = async (customerId) => {
  const accessToken = localStorage.getItem("authToken");
  try {
      const response = await axios.get(
          `http://localhost:8080/api/accounts/${customerId}`,
          {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          }
      );
      console.log(response.data);
      return response.data;
  } catch (error) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      throw new Error(errorMessage);
  }
};





export const updateCustomer = async (updatedCustomer) => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axios.put(
      `http://localhost:8080/api/accounts/${updatedCustomer.id}`,
      updatedCustomer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error; 
  }
};

export const verifyAdmin = async () => {
  const userId = localStorage.getItem('userId');
  const gettoken = localStorage.getItem('authToken');
  
  try {
    const response = await axios.get(`http://localhost:8080/api/auth/verify-admin`,null, {
      params: {
        token: gettoken,
      },
    });
    
    return response.data; // Should return a boolean or some other verification result
  } catch (error) {
    console.error('Error verifying user:', error);
    return false;
  }
};


export const verifyUser = async () => {
  const userId = localStorage.getItem('userId');
  const gettoken = localStorage.getItem('authToken');


  try {
    const response = await axios.get(`http://localhost:8080/api/auth/verify-user`,null, {
      params: {
        token: gettoken,
      },
    });
    return response.data; // Should return a boolean or some other verification result
  } catch (error) {
    console.error('Error verifying user:', error);
    return false;
  }
  
};

export const createAccount = async ({ accountDTO, customerId }) => {
  const token = localStorage.getItem('authToken');
  if(!customerId){
    // throw new error('customer id is missing');
    console.log('customerid is missing');
  }
  try {
    console.log('creating account');
    const response = await axios.post(
      `http://localhost:8080/api/accounts/${customerId}`,
      accountDTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('account creation',response);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const deleteAccount = async (accountId) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.delete(`http://localhost:8080/api/accounts/${accountId}`, {
      headers: { Authorization:` Bearer ${token} `}
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export const deleteCustomer = async (customerId) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.delete(`http://localhost:8080/api/accounts/deletecustomer/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

export const verifyCustomerFiles = async (verificationDTO) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.post(
      `http://localhost:8080/api/accounts/verify`,
      verificationDTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error verifying customer files:', error);
    throw error;
  }
};
//corect one====
// export const fetchAccountsByCustomerId = async (customerId) => {
//   const token = localStorage.getItem("authToken");
//   const response = await axios.get(`http://localhost:8080/api/accounts/customer/${customerId}`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data.content;
// };
//== to here

export const fetchAccountsByCustomerId = async (customerId) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(`http://localhost:8080/api/accounts/customer/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('API Response:', response.data); // Debug: Check the API response
    return response.data.content; // Ensure this is the correct path to the accounts
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error; // Propagate the error
  }
};

export const fetchCustomers=async () =>{
  const token = localStorage.getItem("authToken");
  const response=await axios.get("http://localhost:8080/api/accounts",{
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.content;

}
export const deactivateCustomer=async(customerId)=>{
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/accounts/deactivateCustomerAndAccounts/${customerId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data.content; // Ensure this matches the actual response structure
  } catch (error) {
    console.error('Error deactivating customer and accounts:', error);
    throw error; // Rethrow error to be caught in the calling function
  }
};


// Bank

const API_BASE_URL = 'http://localhost:8080/api/banks';

export const fetchBanks = async (authToken) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching banks:', error);
        throw error;
    }
};

export const deleteBank = async (bankId, authToken) => {
    try {
        await axios.delete(`${API_BASE_URL}/${bankId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
    } catch (error) {
        console.error('Error deleting bank:', error);
        throw error;
    }
};

export const addBank = async (newBank, authToken) => {
    try {
        await axios.post(API_BASE_URL, newBank, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
    } catch (error) {
        console.error('Error adding bank:', error);
        throw error;
    }
};

export const updateBank = async (bankId, updatedBank, authToken) => {
    try {
        await axios.put(`${API_BASE_URL}/${bankId}`, updatedBank, {
            headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error updating bank:', error);
        throw error;
    }
};

//userdashboard



const API_BASE_URLL = 'http://localhost:8080/api';

export const fetchAccountBalances = async (accountNumbers, authToken) => {
  const balances = {};
  for (const account of accountNumbers) {
    try {
      const response = await axios.get(`${API_BASE_URLL}/accounts/${account.accountId}/balance`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      balances[account.accountId] = response.data;
    } catch (error) {
      console.error(`Error fetching balance for account ${account.accountId}:`, error);
    }
  }
  return balances;
};

export const fetchCustomerDetails = async (customerId, authToken) => {
  const response = await axios.get(`${API_BASE_URLL}/customers/${customerId}/totalBalance`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data;
};

export const fetchCustomerData = async (customerId, authToken) => {
  const customerResponse = await axios.get(`${API_BASE_URLL}/customers/${customerId}/details`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  const accountResponse = await axios.get(`${API_BASE_URL}/customers/${customerId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return { customerDetails: customerResponse.data, accountNumbers: accountResponse.data };
};

// export const fetchTransactions = async (customerId, authToken) => {
//   const response = await axios.get(`${API_BASE_URLL}/customers/${customerId}/passbook`, {
//     headers: { Authorization: `Bearer ${authToken}` },
//   });
//   return response.data.content;
// };


const API_URL = 'http://localhost:8080/api/transactions';

export const fetchTransactions = async (page, size, type = '', value = '', startDate = '', endDate = '', token) => {
  try {
    let url = `${API_URL}/all`;
    let params = { page: page - 1, size: size };

    if (type === 'transactionId') {
      url = `${API_URL}/${value}`;
      params = {}; // No pagination for single transaction
    } else if (type === 'dateRange') {
      url = `${API_URL}/byDateRange`;
      params = { page: page - 1, size: size, startDate, endDate }; // Include pagination
    } else if (type) {
      params[type] = value;
    }

    const response = await axios.get(url, {
      params: params,
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; // Rethrow to handle in component
  }
};

// for registration

const API_BASE_URL_REGISTER = 'http://localhost:8080/api/auth';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL_REGISTER}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};





