import axios from 'axios';

const apiKey = 'rnd_L84GwTcAUXEGwm5Hbj0kOvckDojr'; // Your API key

const axiosInstance = axios.create({
  baseURL: 'https://todoserver121.onrender.com',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

const handleRequestError = (error) => {
  console.error('API Error:', error.response?.data?.message || error.message);
  return Promise.reject(error);
};

let isTodosLoading = false; // Flag to indicate loading state

export default {
  getTasks: async () => {
    isTodosLoading = true; // Set loading flag to true

    try {
      const result = await axiosInstance.get('/items');
      isTodosLoading = false; // Set loading flag to false on success
      return result.data;
    } catch (error) {
      isTodosLoading = false; // Set loading flag to false on error
      return handleRequestError(error);
    }
  },

  addTask: async (name) => {
    try {
      const result = await axiosInstance.post('/', { name });
      return result.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const result = await axiosInstance.put(`/${id}`, { isComplete });
      return result.data;
    } catch (error) {
      return handleRequestError(error);
    }
  },

  deleteTask: async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
      return { success: true };
    } catch (error) {
      return handleRequestError(error);
    }
  },

  isLoadingTodos: () => {
    return isTodosLoading; // Function to check loading state
  },
};
