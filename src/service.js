const apiUrl = https://app-5cedf3e4-31df-4667-8c0a-403aa64092f3.cleverapps.io;

const logRequest = (method, url, data) => {
    console.log(`Request Method: ${method}`);
    console.log(`Request URL: ${apiUrl}${url}`);
    if (data) console.log(`Request Data: ${JSON.stringify(data)}`);
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error occurred');
    }
    return response.json();
};

export default {
    getTasks: async () => {
        logRequest('GET', '/items');
        const response = await fetch(`${apiUrl}/items`);
        return handleResponse(response);
    },
    addTask: async (name) => {
        logRequest('POST', '/', { name });
        const response = await fetch(`${apiUrl}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        return handleResponse(response);
    },
    setCompleted: async (id, isComplete) => {
        logRequest('PUT', `/${id}`, { isComplete });
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ isComplete })
        });
        return handleResponse(response);
    },
    deleteTask: async (id) => {
        logRequest('DELETE', `/${id}`);
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return handleResponse(response);
    }
};
