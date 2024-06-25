import axios from 'axios';

const apiKey = 'rnd_L84GwTcAUXEGwm5Hbj0kOvckDojr';  

const axiosInstance = axios.create({
  baseURL: 'https://todoserver121.onrender.com',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }
});

const handleRequestError = (error) => {
  console.error('API Error:', error.response?.data?.message || error.message);
  return Promise.reject(error);
};

export default {
  getTasks: async () => {
    try {
      const result = await axiosInstance.get('/items');
      return result.data;
    } catch (error) {
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
};
