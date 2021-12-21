import styled from "styled-components";
import adidasOffice from '../images/adidas-office.jpg';
import { useState } from "react";
import { login } from "../api/Login";
import { login as loginRedux } from "../redux/reducers/userRedux";
import { useDispatch} from "react-redux";

const Container = styled.div`
    display: flex;
`

const BgPhoto = styled.div`
    background: url(${adidasOffice});
    width:50%;
    height:100vh;
    filter: brightness(50%);
` 

const LoginContainer = styled.div`
    width: 50%;
    display: flex;
`

const LoginForm= styled.form`
    margin: auto;
    justify-content: center;
`

const LoginInput = styled.input`
    margin:15px auto;
    width:300px;
    height:30px;
    padding: 1rem;
`

const LoginButton = styled.button`
    display: block;
    margin: 30px auto;
`

const LoginLabel = styled.h3`
    color: #5C5A5F;
    font-size: 22px;
`


const Login = () => {

    const [credentials, setCredentials] = useState({username:'', password: ''});
    const dispatch = useDispatch();

    const handleChange = e => {
        setCredentials(prev => {
            return {...prev, [e.target.name]:e.target.value}
        })
        console.log(credentials);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const user = await login(credentials);
            console.log(user.data)
            dispatch(loginRedux({currentUser:user.data}));
        } catch(err){
            console.log(err)}
    }

    return(
        <Container>
            <BgPhoto />
            <LoginContainer>
                <LoginForm onSubmit={(e) => handleSubmit(e)}>
                    <LoginLabel>Usuario:</LoginLabel>
                    <LoginInput name='username' placeholder="username" onChange={e => handleChange(e)}/>
                    <LoginLabel>Contraseña:</LoginLabel>
                    <LoginInput name='password' type='password' placeholder="password" onChange={e => handleChange(e)}/>
                    <LoginButton type='submit' className='btn btn-secondary'>Ingresar</LoginButton>
                </LoginForm>
            </LoginContainer>
        </Container>
    )
}

export default Login;