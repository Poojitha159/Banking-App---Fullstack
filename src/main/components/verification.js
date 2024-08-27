import React from 'react'

const verification = () => {

    const verifyUser = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');
        const role=localStorage.getItem('userRole')
        try {
          const response = await axios.get(`http://localhost:8080/api/auth/verifyUser/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if(role=='ROLE_ADMIN'){
            console.log("admin board")
            navigate('/admindashboard');
          }
          else if(role=='ROLE_USER'){
            console.log("USER dashboard")
            navigate('/userdashboard')
          }
          

          return response.data; // Should return a boolean or some other verification result
        } catch (error) {
          console.error('Error verifying user:', error);
          return false;
        }
      };

  return (
    
  )
}

export default verification
