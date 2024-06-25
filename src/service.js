 import axios from 'axios';

const apiUrl = process.env.REACT_APP_API; // Use environment variable

const defaultAxios = axios.create({
  // baseURL is removed
});

defaultAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default {
// getTasks: async () => {
// const result = await defaultAxios.get('/items');
// return result.data;
// },
 getTasks: async () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
  });
  console.log(apiUrl);
  const result = await axiosInstance.get('/items');
  return result.data;
},

addTask: async (name) => {
const result = await defaultAxios.post('/', { name });
return result.data;
},

setCompleted: async (id, isComplete) => {
const result = await defaultAxios.put(`/${id}`, { isComplete });
return result.data;
},

deleteTask: async (id) => {
await defaultAxios.delete(`/${id}`);
return { success: true };
},
};
