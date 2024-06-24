import axios from 'axios';

// const apiUrl = process.env.REACT_APP_API;
const apiUrl =`https://app-5cedf3e4-31df-4667-8c0a-403aa64092f3.cleverapps.io`;
console.log("שלום");
const defaultAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*', // כותרת זו כדי להתייחס ל-CORS
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // וכותרת זו עם הפעולות המותרות
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', // וכותרת זו לכותרות מסוימות
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
