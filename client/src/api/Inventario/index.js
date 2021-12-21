import axios from 'axios';

const base_url = 'http://localhost:5000/api/inventario';

export const fetchMaterias = () => axios.get(`${base_url}/materias`);
export const fetchFilteredMaterias = (query) => axios.get(`${base_url}/materias/buscar/${query}`);

export const fetchMateria = (id) => axios.get(`${base_url}/materias/${id}`);
export const crearMateria = (postData) => axios.post(`${base_url}/materias`, postData);
export const deleteMateria = (id) => axios.delete(`${base_url}/materias/${id}`);
export const updateMateria = (id, dataToUpdate) => axios.put(`${base_url}/materias/${id}`, dataToUpdate)