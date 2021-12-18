import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as api from '../../api/Inventario';
import {updateMateria, toggleClicked} from '../../redux/reducers/updateMateria';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

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

const Button = styled.button`
    background-color: transparent;
    border: none;
    :focus{
        outline-width: 0;
    }
    width: auto;
    height: auto;
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
    width: 150px;
`


const Productos = () => {

    const [query, setQuery] = useState('');
    const handleChange = e => setQuery(e.target.value);

    const dispatch = useDispatch();

    const [materias, setMaterias] = useState([]);
    const {dataToUpdate, clicked} = useSelector((state) => state.updateM)

    const getMateria = async () => {
        try{
            const res = await api.fetchMaterias();
            setMaterias(res.data);
        } catch (err){console.log(err)}
    }

    getMateria();

    const handleClick = async e => {
        const id = e.target.id;
        console.log(id);
        try{
            await api.deleteMateria(id);
        } catch (err){console.log(err)}

    }

    const handleEdit = async e => {
        const id = e.target.id;
        console.log(id);
        try{
            const res = await api.fetchMateria(id);
            const data = res.data;
            dispatch(updateMateria(data));
            dispatch(toggleClicked())
            console.log(dataToUpdate);
            console.log(clicked);
        } catch (err){console.log(err)}

    }
    

    const mapping = (materia) => {
        return(
            <tr>
                <Td>{materia.name}</Td>
                <Td>{materia.amount}</Td>
                <Td>{materia.price}</Td>
                <Td>
                    <Button id={materia._id} onClick={ e => handleEdit(e)}><ModeEditIcon /></Button>
                    <Button id={materia._id} onClick={e => handleClick(e)}><DeleteIcon onClick={e => handleClick(e)}/></Button>
                </Td>
            </tr>
        )
    }

    return( 
            <Container>
                <SearchContainer>
                    <Search onChange={e => handleChange(e)} value={query}/>
                    <Button><SearchIcon /></Button>
                </SearchContainer>
                <TableContainer>
                    <Table className="table table-hover">
                        <thead>
                            <tr>
                                <Th>Nombre</Th>
                                <Th>Cantidad</Th>
                                <Th>Precio</Th>
                                <Th>Accion</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {materias.map(mapping)}
                        </tbody>
                    </Table>
                </TableContainer>
            </Container>
    )
}

export default Productos;