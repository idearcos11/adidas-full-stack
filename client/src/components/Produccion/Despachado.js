import styled from "styled-components"
import * as api from '../../api/Produccion';
import { useState } from "react";

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

const Despachado = () => {

    const [ordenes, setOrdenes] = useState([]);
    const [query, setQuery] = useState('');
    
    


    const getOrdenes = async () => {
        try{
            const res = await api.ordenesDespachadas();
            setOrdenes(res.data);
        } catch (err){console.log(err)}
    }

    getOrdenes();


    const mapping = (orden) => {
        return(
            <Tr>
                <Td>{orden._id}</Td>
                <Td>{orden.titulo}</Td>
                <Td>{orden.status}</Td>
                <Td>{orden.createdAt.slice(0,10)}</Td>
                <Td><Button className="btn btn-primary" id={orden._id}>Ver orden</Button></Td>
            </Tr>
        )
    }

    const handleChange = e => setQuery(e.target.value);

    return (
        <Container>
            <Title>
                Ordenes despachadas
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
                            <Th scope="col">Creación</Th>
                            <Th scope="col">Acciones</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {ordenes.map(mapping)}                        
                    </tbody>
                </Table>   
            </TableContainer>   
        </Container>
    )
}

export default Despachado;