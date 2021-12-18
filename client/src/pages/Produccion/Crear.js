import styled from "styled-components";
import Form from "../../components/Produccion/Form";
import Disponible from "../../components/Produccion/Disponible";
import Panel from "../../components/Produccion/Panel";
const Container = styled.div``

const Crear = () => {
    return(
        <Container>
            <Form />
            <Panel />
            <Disponible />
        </Container>
    )
}

export default Crear;