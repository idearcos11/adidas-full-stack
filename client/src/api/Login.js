import axios from 'axios';

const base_url = 'http://localhost:5000/api/auth';


export const login = (credentials) => axios.post(`${base_url}/login`, credentials);
export const register = (credentials) => axios.post(`${base_url}/registro`, credentials);
