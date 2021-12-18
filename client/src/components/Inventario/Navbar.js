import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height:60px;
    background-color: #EAE5FC;
    padding:5px;
    align-items:center;
`

const Left = styled.div`
    flex: 9;
    display: flex;
    gap: 20px;
    margin-left:20px;
    align-items:center;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right:20px;
    align-items:center;
`

const NavbarLink = styled.h2`
    font-size:20px;
    font-weight: 400;
    color: #0080ff;
`


const Navbar = () => {
    return(
        <Container>
            <Left>
                <NavbarLink>Logo</NavbarLink>
                <NavbarLink>Inicio</NavbarLink>
                <NavbarLink>Gestionar productos</NavbarLink>
            </Left>
            <Right>
                <NavbarLink>Usuario</NavbarLink>
            </Right>

        </Container>
    )
}



export default Navbar;