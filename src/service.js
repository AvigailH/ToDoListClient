import axios from 'axios';

const apiUrl = `https://app-5cedf3e4-31df-4667-8c0a-403aa64092f3.cleverapps.io`;
const defaultAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*', // This header to refer to CORS
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // and this header with the allowed operations
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', // and this header for certain headers
    },
});

defaultAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default {
    getTasks: async () => {
        const result = await defaultAxios.get('/items');  
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
