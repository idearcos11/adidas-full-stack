import * as api from '../../api/Produccion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePanel } from '../../redux/reducers/updatePanel';
import styled from 'styled-components';


const Container = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    gap:20px;
    flex-direction: column;
    align-items: center;

`
const Table = styled.table`

`
const TableContainer =styled.div`
    width: 500px;
    margin-top:30px;
`

const Td = styled.td`
    width: ${props => props.width ? props.width : '60px' };
    text-align:center;
    text-transform:capitalize;
`
const Th = styled.th`
    text-align:center;
    text-transform:capitalize;
`

const Button = styled.button`
    border-radius: 50%;
    height:30px;
    width:30px;
    margin: auto 3px;
    text-align: center;
`
const Tr = styled.tr`
    margin: auto;
    align-items: center;
`

const Title = styled.h2`
    font-size: 20px;
    text-align:center;
    font-weight: bold;
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
    width: auto;
    height: auto;
`

const Disponible = () => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        minimumFractionDigits: 0
    });
      

    const [query, setQuery] = useState('');
    const handleChange = e => setQuery(e.target.value);

    const dispatch = useDispatch()

    const {panel} = useSelector(state => state.updateP);

    const [materias, setMaterias] = useState([]);

    const getMaterias = async () => {
        try{
            const res = await api.fetchMaterias();
            setMaterias(res.data);
        } catch (err){console.log(err)}
    }

    getMaterias();

    const handleAgregar= async (e) => {

        const id = e.target.id;
        
        let inList = false;

        for(let i=0; i<panel.length; i++){
            if(panel[i]._id === id){
                inList = true
                i=panel.length;
            }
        }

        if (!inList) {
            try{
                const res = await api.fetchMateria(id);
                const {_id, name, price} = res.data;
                const test = {_id, name, price, cantidad:2};
                dispatch(updatePanel(test)); 
            } catch(err){console.log(err)}
            console.log(panel)
        }
    }

    const mapping = (materia) => {
        return(
            <Tr>
                <Td>{materia.name}</Td>
                <Td>{materia.amount}</Td>
                <Td>{formatter.format(materia.price)}</Td>
                <Td><Button className="btn btn-primary" id={materia._id} onClick={e => handleAgregar(e)}>+</Button></Td>
            </Tr>
        )
    }


    return(
        <Container>
            <SearchContainer>
                <Search onChange={e => handleChange(e)} value={query}/>
                <SearchButton><i className="fa-solid fa-magnifying-glass"></i></SearchButton>
            </SearchContainer>

            <TableContainer>
                <Table className="table table-hover">
                    <thead>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Cantidad</Th>
                            <Th>Precio</Th>
                            <Th>Accion</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {materias.map(mapping)}
                    </tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Disponible;