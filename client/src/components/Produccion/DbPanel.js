import { useState } from "react";
import styled from "styled-components";
import * as api from '../../api/Produccion';
import {Link} from 'react-router-dom';

const Container = styled.div`

`
const CardContainer = styled.div`
    display:flex;
    gap: 40px;
    margin-top:70px;
    justify-content:center
`
const Card = styled.div`
    background-color: ${props => props.color};
    height:120px;
    width:250px;
    border-radius:5px;
    cursor: pointer;
`

const CardContent = styled.div`
    padding:20px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const CardTitle = styled.h2`
    color: white;
    font-weight: 500;
    font-size:${ props => props.id==='venta' ? '24px' : '40px'};
    
`
const CardDesc = styled.p`
    color: white;
    margin:auto;
    align-items:center;
`


const Panel = () => {

    const [nOrdenes, setnOrdenes] = useState({porDespachar:0,despachados:0});

    const getOrdenes = async () => {
        try{
            const res1 = await api.despachado();
            const res2 = await api.porDespachar();
            const despachado = res1.data.length;
            const porDespachar = res2.data.length;
            setnOrdenes({porDespachar:porDespachar,despachados:despachado});
        } catch (err){console.log(err)}        
    }
    
    getOrdenes();


    return (
        <Container>
            <CardContainer>
                <Link to='/despachado' style={{ textDecoration: 'none' }}>
                    <Card color='#7652F2'>
                        <CardContent>
                            <CardTitle>{nOrdenes.despachados}</CardTitle>
                            <CardDesc>Pedidos despachados</CardDesc>
                        </CardContent>
                    </Card>
                </Link>
                <Link to='/adespachar' style={{ textDecoration: 'none' }}>
                    <Card color='#EC255A'>
                        <CardContent>
                            <CardTitle>{nOrdenes.porDespachar}</CardTitle>
                            <CardDesc>Pedidos por despachar</CardDesc>
                        </CardContent>
                    </Card>
                </Link>
                <Link to='/ordenes' style={{ textDecoration: 'none' }}>
                    <Card color='#20A3B7'>
                        <CardContent>
                        <CardTitle>{nOrdenes.porDespachar+nOrdenes.despachados}</CardTitle>
                        <CardDesc>Pedidos totales</CardDesc>
                        </CardContent>
                    </Card>
                </Link>
            </CardContainer>
        </Container>
    )
}

export default Panel
