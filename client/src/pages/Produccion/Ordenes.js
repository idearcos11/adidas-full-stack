import Navbar from "../../components/Produccion/Navbar";
import TodasOrdenes from "../../components/Produccion/Ordenes";

import styled from "styled-components"

const Container = styled.div`

`
const Ordenes = () => {
    return (
        <Container>
            <Navbar />
            <TodasOrdenes />
        </Container>
    )
}

export default Ordenes;