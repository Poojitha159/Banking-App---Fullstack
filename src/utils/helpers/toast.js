//export// const succesToast = (message) => {

//     toast.success(message);
// }
// const CustomToast = () => {
//     const notify = (message, type) => {
//       toast[type](message);
//     };
  
//     return (
//       <div>
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           closeOnClick
//           pauseOnHover
//           draggable
//           pauseOnFocusLoss
//           theme="colored"
//         />
//       </div>
//     );
//   };
  

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastSuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,  // Close the toast after 3 seconds
    });
};

export const showToastError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
};


export const showToastInfo = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
};

export const showToastWarning = (message) => {
    toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
    });
};

// Initialize ToastContainer in your main component or App.js
// export const ToastContainerInit = () => {
//     return (
//         <toast.ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//         />
//     );
// };