import styled from 'styled-components';
import { logout } from '../../api/Login';
import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../redux/reducers/userRedux";
import { Link } from 'react-router-dom';

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
    cursor:pointer;
`


const Navbar = () => {

    const dispatch = useDispatch();
    
    const off = async () => {
        try{
            await logout();
            dispatch(loginRedux({currentUser: ''}));
            console.log('logout')
        } catch (err){ console.log(err)}
    }

    return(
        <Container>
            <Left>
                <Link style={{ textDecoration: 'none' }} to='/dashboard'><NavbarLink>Logo</NavbarLink></Link>
                <Link style={{ textDecoration: 'none' }} to='/dashboard'><NavbarLink>Inicio</NavbarLink></Link>
                <Link style={{ textDecoration: 'none' }} to='/crear'><NavbarLink>Gestionar productos</NavbarLink></Link>
                <Link style={{ textDecoration: 'none' }} to='/reporte'><NavbarLink>Reporte de ventas</NavbarLink></Link>
            </Left>
            <Right>
                <NavbarLink onClick={() => off()}>Cerrar Sesión</NavbarLink>
            </Right>

        </Container>
    )
}



export default Navbar;