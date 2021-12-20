import { useState } from "react";
import styled from "styled-components";
import { login } from "../api/Login";
import { login as loginRedux } from "../redux/reducers/userRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height:100vh;
`
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Input = styled.input`

`
const LoginButton = styled.button`

`

const Login = (props) => {

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
            dispatch(loginRedux(user.data));
        } catch(err){
            console.log(err)}


    }

    return(
        <Container>
            <h1>Hola, {props.nombre}</h1>
            <LoginForm onSubmit={(e) => handleSubmit(e)}>
                <Input name='username' placeholder="username" onChange={e => handleChange(e)}/>
                <Input name='password' type='password' placeholder="password" onChange={e => handleChange(e)}/>
                <LoginButton className="btn btn-primary">Login</LoginButton>
            </LoginForm>
        </Container>
    )
}

export default Login;