import Navbar from "../../components/Inventario/Navbar";
import MasVendidos from "../../components/Inventario/MasVendidos";
import styled from "styled-components";

const Container = styled.div``;

const Reporte = () => {
    return (
        <Container>
            <Navbar />
            <MasVendidos />
        </Container>
    )
}

export default Reporte
