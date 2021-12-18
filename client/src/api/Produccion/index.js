import axios from 'axios';

const base_url = 'http://localhost:5000/api/produccion';
const url_inventario = 'http://localhost:5000/api/inventario';

export const fetchMaterias = () => axios.get(`${base_url}/materias`);
export const fetchMateria = (id) => axios.get(`${url_inventario}/materias/${id}`);
export const createOrden = (postData) => axios.post(`${base_url}/ordenes`, postData);
export const fetchOrdenes = () => axios.get(`${base_url}/ordenes`);
export const ordenesPorDespachar = () => axios.get(`${base_url}/ordenes/por-despachar`);
export const ordenesDespachadas = () => axios.get(`${base_url}/ordenes/despachado`);
export const updateMateria = (id, dataToUpdate) => axios.patch(`${url_inventario}/materias/${id}`, dataToUpdate);