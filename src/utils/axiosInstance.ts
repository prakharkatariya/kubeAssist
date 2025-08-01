import axios, { AxiosError } from 'axios';

// Axios Interceptor Instance
const axiosInstance = axios.create();

// request interceptor for api calls
axiosInstance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('access_token');

    config.headers['x-api-key'] = process.env.API_KEY;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    Promise.reject(error as AxiosError);
  }
);

// Response interceptor for API calls
// Axios Interceptor: Response Method
axiosInstance.interceptors.response.use(
  response =>
    // Can be modified response
    response,
  error =>
    // Handle response errors here
    Promise.reject(error)
);

export default axiosInstance;
