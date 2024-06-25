import axios from 'axios';

if (!process.env.REACT_APP_API) {
  console.error('REACT_APP_API environment variable is not set');
}

const defaultAxios = axios.create({});

defaultAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

async function getEnvironmentVariable() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(process.env.REACT_APP_API);
    }, 100);
  });
}

export default {
  getTasks: async () => {
    const apiUrl = await getEnvironmentVariable();

    if (!apiUrl) {
      console.error('Failed to retrieve API URL from environment');
      return null; // Handle the missing URL (e.g., return error, show message)
    }

    const axiosInstance = axios.create({
      baseURL: apiUrl,
    });

    console.log(apiUrl); // Log after potential access
    const result = await axiosInstance.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    const apiUrl = await getEnvironmentVariable();

    if (!apiUrl) {
      console.error('Failed to retrieve API URL from environment');
      return null; // Handle the missing URL (e.g., return error, show message)
    }

    const axiosInstance = axios.create({
      baseURL: apiUrl,
    });

    const result = await axiosInstance.post('/', { name });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const apiUrl = await getEnvironmentVariable();

    if (!apiUrl) {
      console.error('Failed to retrieve API URL from environment');
      return null; // Handle the missing URL (e.g., return error, show message)
    }

    const axiosInstance = axios.create({
      baseURL: apiUrl,
    });

    const result = await axiosInstance.put(`/${id}`, { isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    const apiUrl = await getEnvironmentVariable();

    if (!apiUrl) {
      console.error('Failed to retrieve API URL from environment');
      return null; // Handle the missing URL (e.g., return error, show message)
    }

    const axiosInstance = axios.create({
      baseURL: apiUrl,
    });

    await axiosInstance.delete(`/${id}`);
    return { success: true };
  },
};

// async function getEnvironmentVariable() {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(process.env.REACT_APP_API);
//       }, 100); 
//     });
//   }
