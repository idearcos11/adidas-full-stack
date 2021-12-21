import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as api from '../../api/Produccion'
import Navbar from '../../components/Produccion/Navbar'

const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`
const Desc = styled.p``
const Status = styled.p``

const TableContainer = styled.div`
    margin-top: 20px;
`
const Table = styled.table`
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

const Label = styled.span`
    font-weight: bold;
`

const Wrapper = styled.div`
    display: flex;
    gap:10px;
    margin: auto;
   
`


const DeleteContainer = styled.div`
    display:flex;
    gap:10px;
`


const Delete = styled.button``
const Despachar = styled.button``
 


const Orden = () => {
    
    const id = useLocation().pathname.split('/')[2];
    console.log(id);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });

    const [orden, setOrden] = useState({titulo:'', desc:'', productos:[{producto:'',cantidad:''}], status: ''});

    const fetchOrden = async () => {
        const res = await api.fetchOrden(id);
        setOrden(res.data);
        console.log(orden) 
    }

    fetchOrden();

    const mapping = (data) => {
        return(
            <Tr>
                <Td>{data.producto.name}</Td>
                <Td>{data.cantidad}</Td>
                <Td>{formatter.format(data.producto.price)}</Td>
            </Tr>
        )
    }

    const productos = orden.productos;

    const handleDelete = async e => {
        try{
            await api.deleteOrden(orden._id);
        } catch (err) {console.log(err)}
    }

    const handleDespachar = async () => {
        const newStatus = {status:'Despachado'};
        try{
            await api.updateOrden(id, newStatus);
        } catch (err) {console.log(err)}
    }

    return (
        <div>
            <Navbar />
            <Container>
                
                <InfoContainer>
                    <Wrapper><Title>{orden.titulo}</Title></Wrapper>
                    <Wrapper><Label>Descripcion: </Label> <Desc>{orden.desc}</Desc></Wrapper>
                    <Wrapper><Label>Status: </Label> <Status>{orden.status}</Status></Wrapper>
                </InfoContainer>
                <TableContainer>
                    <Title>Productos</Title>
                    <Table className="table table-hover">
                        <thead>
                            <Tr>
                                <Th scope="col">Nombre</Th>
                                <Th scope="col">Cantidad</Th>
                                <Th scope="col">Precio</Th>
                            </Tr>
                        </thead>
                        <tbody>
                            {productos.map(mapping)}                       
                        </tbody>
                    </Table>  
                </TableContainer>
                <DeleteContainer>
                    {orden.status === 'Pendiente' && <div style={{'display':'flex', 'gap':'10px'}}><Link to='/ordenes'><Delete onClick={(e) => handleDelete(e)} className="btn btn-danger" id={orden._id}>Cancelar</Delete></Link> <Link to='/ordenes'><Despachar className='btn btn-success' onClick={(e) => handleDespachar()}>Despachar</Despachar></Link></div>} 
                </DeleteContainer>
            </Container>
        </div>

    )
}


export default Orden;
