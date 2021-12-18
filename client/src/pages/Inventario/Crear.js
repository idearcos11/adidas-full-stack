import Form from '../../components/Inventario/Form';
import Productos from '../../components/Inventario/Productos';
import styled from 'styled-components';
import Navbar from '../../components/Inventario/Navbar';

const Container = styled.div``

const Crear = () => {
    return(
        <Container>
        <Navbar />
            <Form />
            <Productos />
        </Container>
    )
}

export default Crear;
