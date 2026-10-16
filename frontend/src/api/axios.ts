import axios from 'axios';
export const apiClient = axios.create({ baseURL: '/api', timeout: 10000 });
// Reserved for Spring Cloud Gateway integration. The mock UI does not make network requests.
