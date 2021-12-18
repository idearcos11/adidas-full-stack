import styled from "styled-components";
import Form from "../../components/Produccion/Form";
import Disponible from "../../components/Produccion/Disponible";
import Panel from "../../components/Produccion/Panel";
import Navbar from "../../components/Produccion/Navbar";
const Container = styled.div``

const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 200px;
`
const Title = styled.h2`
    text-align: center;
    margin-top: 20px;
`

const Crear = () => {
    return(
        <Container>
            <Navbar />
            <Title>Crear orden</Title>
            <Top>
                <Form />
                <Panel  />
            </Top>
            <Disponible />
        </Container>
    )
}

export default Crear;