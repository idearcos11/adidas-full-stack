import Navbar from "../../components/Produccion/Navbar";
import styled from "styled-components";
import DbPanel from "../../components/Produccion/DbPanel"
import Disponible from "../../components/Inventario/Disponible";
const Container = styled.div`
    
`


const Dashboard = () => {
    return (
        <Container>
            <Navbar />
            <DbPanel />
            <Disponible />
        </Container>
    )
}

export default Dashboard
