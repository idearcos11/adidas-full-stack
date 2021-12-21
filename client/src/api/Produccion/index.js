import axios from 'axios';

const base_url = 'http://localhost:5000/api/produccion';
const url_inventario = 'http://localhost:5000/api/inventario';

export const fetchMaterias = () => axios.get(`${base_url}/materias`);
export const fetchFilteredMaterias = (query) => axios.get(`${url_inventario}/materias/buscar/${query}`);
export const fetchMateria = (id) => axios.get(`${url_inventario}/materias/${id}`);

export const createOrden = (postData) => axios.post(`${base_url}/ordenes`, postData);

export const fetchOrdenes = () => axios.get(`${base_url}/ordenes`);
export const fetchOrden = (id) => axios.get(`${base_url}/ordenes/orden/${id}`);
export const deleteOrden = (id) => axios.delete(`${base_url}/ordenes/orden/${id}`);
export const fetchFilteredOrdenes = (query) => axios.get(`${base_url}/ordenes/buscar/${query}`);

export const updateOrden = (id, postData) => axios.put(`${base_url}/ordenes/${id}`, postData);

export const porDespachar = () => axios.get(`${base_url}/ordenes/por-despachar`);
export const filteredPorDespachar = (query) => axios.get(`${base_url}/ordenes/por-despachar/buscar/${query}`);

export const despachado = () => axios.get(`${base_url}/ordenes/despachado`);
export const filteredDespachado = (query) => axios.get(`${base_url}/ordenes/despachado/buscar/${query}`);


export const updateMateria = (id, dataToUpdate) => axios.patch(`${url_inventario}/materias/${id}`, dataToUpdate);