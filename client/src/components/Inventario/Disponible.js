import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as api from '../../api/Inventario';
import SearchIcon from '@mui/icons-material/Search';

const Container = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    margin-top:80px;
    gap:50px;
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

const TableContainer = styled.div`
    
`
const Table = styled.div`
`
const Td = styled.td`
    width: 200px;
    text-align:center;
    text-transform:capitalize;
`
const Th = styled.th`
    text-align:center;
    text-transform:capitalize;
`

const Title = styled.h2`

`


const Disponible = () => {

    const [materias, setMaterias] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredMaterias, setFilteredMaterias] = useState([]);



    const getMaterias = async () => {
        try{
            const res = await api.fetchMaterias(query);
            setMaterias(res.data);
        } catch (err){console.log(err)}
    }

    getMaterias();

    const getFilteredMaterias = async () => {
        try{
            const res = await api.fetchFilteredMaterias(query);
            setFilteredMaterias(res.data);
        } catch (err){console.log(err)}
    }

    useEffect(() => {
        getFilteredMaterias();
    }, [query])

    const mapping = (materia) => {
        return(
            <tr>
                <Td>{materia.name}</Td>
                <Td>{materia.desc}</Td>
                <Td>{materia.amount}</Td>
            </tr>
        )
    }

    const handleChange = e => {
        setQuery(e.target.value)
        console.log(query);
    };


    return (
        <div>
            <Container>
                <SearchContainer>
                    <Search onChange={e => handleChange(e)} value={query}/>
                    <SearchButton><SearchIcon /></SearchButton>
                </SearchContainer>
                <Title>Productos disponibles</Title>
                <TableContainer>
                    <Table className="table table-hover">
                        <thead>
                            <tr>
                                <Th scope="col">Nombre</Th>
                                <Th scope="col">Descripcion</Th>
                                <Th scope="col">Cantidad</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {query? filteredMaterias.map(mapping) : materias.map(mapping)}
                        </tbody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default Disponible;
