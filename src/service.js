import axios from 'axios';

const apiKey = process.env.APIKEY; // Your API key

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json',
  },
});

function handleRequestError(error) {
  console.error('API Error:', error.response ? error.response.data.message : error.message);
  return Promise.reject(error);
}

let isTodosLoading = false; // Flag to indicate loading state

const api = {
  getTasks: function() {
    isTodosLoading = true; // Set loading flag to true

    return axiosInstance.get('/items')
      .then(function(result) {
        console.log(result);
        isTodosLoading = false; // Set loading flag to false on success
        return result.data;
      })
      .catch(function(error) {
        isTodosLoading = false; // Set loading flag to false on error
        return handleRequestError(error);
      });
  },

  addTask: function(name) {
    return axiosInstance.post('/', { name })
      .then(function(result) {
        return result.data;
      })
      .catch(function(error) {
        return handleRequestError(error);
      });
  },

  setCompleted: function(id, isComplete) {
    return axiosInstance.put('/' + id, { isComplete })
      .then(function(result) {
        return result.data;
      })
      .catch(function(error) {
        return handleRequestError(error);
      });
  },

  deleteTask: function(id) {
    return axiosInstance.delete('/' + id)
      .then(function() {
        return { success: true };
      })
      .catch(function(error) {
        return handleRequestError(error);
      });
  },

  isLoadingTodos: function() {
    return isTodosLoading; // Function to check loading state
  },
};

export default api;
