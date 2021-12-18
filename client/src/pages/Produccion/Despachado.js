import Navbar from "../../components/Produccion/Navbar";
import Ordenes from "../../components/Produccion/Despachado";

import styled from "styled-components"

const Container = styled.div`

`
const Despachado = () => {
    return (
        <Container>
            <Navbar />
            <Ordenes />
            
        </Container>
    )
}

export default Despachado;