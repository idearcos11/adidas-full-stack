import { useSelector } from 'react-redux';
import {deleteItem, addQuantity, subtractQuantity} from '../../redux/reducers/updatePanel';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap:20px;
`
const Table = styled.table`

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

const Panel = () => {
    const {panel} = useSelector(state => state.updateP);
    const dispatch = useDispatch()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        minimumFractionDigits: 0
    });

    const handleDelete = (e) => {
        const id = e.target.id;
        for (let i=0; i<panel.length; i++){
            if (panel[i]._id === id){
                const index = i;
                dispatch(deleteItem(index));
                i=panel.length;
            }
        }
    }

    const modify = (e) => {
        const id = e.target.id;
        const index = panel.indexOf(panel.find(element => element._id === id));
        const action = e.target.name;
        action === 'add' ? dispatch(addQuantity(index)) : dispatch(subtractQuantity(index)) 
    }

    let sum = 0;
    
    panel.forEach(item => {
        sum += item.cantidad*item.price;
    });
 

    const mapping = (item) => {

        
        return(
            <Tr>
                <Td>{item.name}</Td>
                <Td>{item.cantidad}</Td>
                <Td>{formatter.format(item.cantidad*item.price)}</Td>
                <Td>
                    <Button className="btn btn-primary" onClick={e => modify(e)} id={item._id} name='add'>+</Button>
                    <Button className="btn btn-secondary" id={item._id} onClick={e => modify(e)} id={item._id} name='subtract'>-</Button>
                    <Button className="btn btn-danger" id={item._id} onClick={e => handleDelete(e)}></Button>
                </Td>
            </Tr>
        )
    }

    return(
        <Container>
            <Title>Productos seleccionados </Title>
            <Table className="table table-hover">
                <thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Cantidad</Th>
                        <Th>Total</Th>
                        <Th width='200px'>Accion</Th>
                    </Tr>
                </thead>
                <tbody>
                    {panel.map(mapping)}
                    {panel !== [] && <Tr><Td style={{fontWeight:'bold'}}>Total</Td><Td /> <Td>{formatter.format(sum)}</Td> </Tr>}
                </tbody>

            </Table>
        </Container>
    );
}

export default Panel;