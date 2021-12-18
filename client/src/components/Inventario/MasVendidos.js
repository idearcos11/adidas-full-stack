import { useState } from "react";
import styled from "styled-components"
import * as api from '../../api/Inventario';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    flex-direction:column;
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

const Title = styled.h1`
    margin-bottom:50px;
`



const MasVendidos = () =>{

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });

    const [materias, setMaterias] = useState([]);
    

    const getMaterias = async () => {
        try{
            const res = await api.fetchMaterias();
            const unfilteredMaterias = res.data;
            setMaterias(unfilteredMaterias.sort((a,b) => b.sold- a.sold));
        } catch (err){console.log(err)}
    }

    getMaterias();

    const mapping = (materia) => {
        return(
            <tr>
                <Td>{materia.name}</Td>
                <Td>{materia.sold}</Td>
                <Td>{materia.amount}</Td>
                <Td> {formatter.format(materia.price)} </Td>
                <Td>{formatter.format((materia.price*materia.sold))}</Td>
            </tr>
        )
    }

    return (
        <Container>
            <Title>Productos más vendidos</Title>
            <TableContainer>
                <Table className="table table-hover">
                    <thead>
                        <tr>
                            <Th scope="col">Nombre</Th>
                            <Th scope="col">Vendidos</Th>
                            <Th scope="col">Disponibles</Th> 
                            <Th scope="col">Precio</Th> 
                            <Th scope="col">Total</Th> 
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

export default MasVendidos;
