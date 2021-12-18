import Navbar from "../../components/Produccion/Navbar";
import Ordenes from "../../components/Produccion/PorDespachar";

import styled from "styled-components"

const Container = styled.div`

`

const PorDespachar = () => {
    return (
        <Container>
            <Navbar />
            <Ordenes />
        </Container>
    )
}

export default PorDespachar
