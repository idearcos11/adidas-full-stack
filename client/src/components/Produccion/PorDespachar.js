import styled from "styled-components"
import * as api from '../../api/Produccion';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    margin-top:80px;
    gap:50px;
`
const TableContainer = styled.div`
    
`
const Table = styled.div`
`
const Td = styled.td`
    width: 200px;
    text-transform:capitalize;
    text-align:center;
    vertical-align: bottom;
`
const Th = styled.th`
    text-align:center;
    text-transform:capitalize;
`
const Tr = styled.tr`
    align-items: center;
    vertical-align: center;
`

const Title = styled.h2`

`

const Button = styled.button`

`

const SearchContainer = styled.div`
    height:40px;
    width: 400px;
    border: 1px grey solid;
    display: flex;
    align-items: center;
`

const Search = styled.input`
    width:90%;
    height: 100%;
    border: none;
    padding: 10px;
    :focus{
        outline-width: 0;
    }
`

const SearchButton = styled.button`
    background-color: transparent;
    border: none;
    :focus{
        outline-width: 0;
    }
`
const Delete = styled.button``

const PorDespachar = () => {

    const [ordenes, setOrdenes] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredOrdenes, setFilteredOrdenes] = useState([]);
    


    const getOrdenes = async () => {
        try{
            const res = await api.porDespachar();
            setOrdenes(res.data);
        } catch (err){console.log(err)}
    }

    getOrdenes();

    const getFilteredOrdenes = async () => {
        try{
            const res = await api.filteredPorDespachar(query);
            setFilteredOrdenes(res.data);
        } catch (err){console.log(err)}
    }

    useEffect(() => {
        getFilteredOrdenes()
    }, [query])


    const handleCancel = (e) => {
        //cancelar orden
        //devolver materias
    }

    const handleDespachar = async (e) => {
        const newStatus = {status:'Despachado'};
        const id = e.target.id;
        console.log(id);
        try{
            await api.updateOrden(id, newStatus);
        } catch (err) {console.log(err)}
    }

    const mapping = (orden) => {
        return(
            <Tr>
                <Td>{orden._id}</Td>
                <Td>{orden.titulo}</Td>
                <Td>{orden.status}</Td>
                <Td>{orden.createdAt.slice(0,10)}</Td>
                <Td><div style={{display: 'flex', justifyContent:'center', gap:'3px'}}><Link to={`/ordenes/${orden._id}`}><Button className="btn btn-primary" id={orden._id}>Ver</Button></Link> <Delete onClick={() => handleDelete(orden._id)} className="btn btn-danger" id={orden._id}>Cancelar</Delete><Button className="btn btn-success" id={orden._id} onClick={(e) => handleDespachar(e) }>Despachar</Button></div></Td>
            </Tr>
        )
    }

    const handleChange = e => setQuery(e.target.value);

    const handleDelete = async id => {
        try{
            await api.deleteOrden(id);
        } catch (err) {console.log(err)}
    }

    return (
        <Container>
            <Title>
                Ordenes por despachar
            </Title>
            <SearchContainer>
                <Search onChange={e => handleChange(e)} value={query}/>
                <SearchButton>Buscar</SearchButton>
            </SearchContainer>
            <TableContainer>
                <Table className="table table-hover">
                    <thead>
                        <Tr>
                            <Th scope="col">ID</Th>
                            <Th scope="col">Nombre</Th>
                            <Th scope="col">Status</Th>
                            <Th scope="col">Creaci??n</Th>
                            <Th scope="col">Acciones</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {query? filteredOrdenes.map(mapping) : ordenes.map(mapping)}                        
                    </tbody>
                </Table>   
            </TableContainer>   
        </Container>
    )
}

export default PorDespachar;
