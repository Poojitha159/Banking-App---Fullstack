
import axios from "axios";

export const getCustomerById=async(customerId) => {
    let accessToken=localStorage.getItem("authToken");
    try{
        const response=await axios.get(
            `http://localhost:8080/api/accounts/${customerId}`,
    {
        headers:{
            Authorization:`Bearer ${accessToken}`,
        },
    }

        );
console.log(response.data);
return response.data;
    }
    catch(error){
        console.error("no customer found");
        throw error;
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
  try {
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

export const fetchAccountsByCustomerId = async (customerId) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get(`http://localhost:8080/api/accounts/customer/${customerId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.content;
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
  const response=await axios.delete(`http://localhost:8080/api/accounts/deactivateCustomerAndAccounts/${customerId}`,null,{
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.content;
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

export const fetchTransactions = async (customerId, authToken) => {
  const response = await axios.get(`${API_BASE_URLL}/customers/${customerId}/passbook`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data.content;
};
