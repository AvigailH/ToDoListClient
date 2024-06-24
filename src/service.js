import axios from 'axios';

// הגדרת כתובת ה-URL הבסיסית של ה-API
const apiUrl = 'https://app-5cedf3e4-31df-4667-8c0a-403aa64092f3.cleverapps.io';

const defaultAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

defaultAxios.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

const logRequest = (method, url, data) => {
    console.log(`Request Method: ${method}`);
    console.log(`Request URL: ${defaultAxios.defaults.baseURL}${url}`);
    if (data) console.log(`Request Data: ${JSON.stringify(data)}`);
};

export default {
    getTasks: async () => {
        logRequest('GET', '/items');
        const result = await defaultAxios.get(`${apiUrl}/items`);
        return result.data;
    },
    addTask: async (name) => {
        logRequest('POST', '/', { name });
        const result = await defaultAxios.post(`${apiUrl}/`, { name });
        return result.data;
    },
    setCompleted: async (id, isComplete) => {
        logRequest('PUT', `/${id}`, { isComplete });
        const result = await defaultAxios.put(`${apiUrl}/${id}`, { isComplete });
        return result.data;
    },
    deleteTask: async (id) => {
        logRequest('DELETE', `/${id}`);
        await defaultAxios.delete(`${apiUrl}/${id}`);
        return { success: true };
    }
};
