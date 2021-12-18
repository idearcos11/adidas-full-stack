import Navbar from "../../components/Inventario/Navbar";
import styled from 'styled-components';
import Disponible from "../../components/Inventario/Disponible";


const Container = styled.div`

`



const Dashboard = () => {
    return (
     <Container>
        <Navbar />
        <Disponible/>
     </Container>
    )
}

export default Dashboard
