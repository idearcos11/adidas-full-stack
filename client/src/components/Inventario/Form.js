import styled from 'styled-components';
import { useSelector  } from 'react-redux';
import { useState, useEffect } from 'react';
import * as api from '../../api/Inventario';


const Container = styled.div``
const PostForm = styled.form`
    display: flex;
    flex-direction:column;
`
const FormContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top:50px;
    gap: 10px;
    flex-direction: column;
`
const Input = styled.input`
    width: ${props => props.width ? props.width : '300px'};
    padding:5px;
`
const Desc = styled.textarea`
    resize: none;
    height:100px;
    margin-bottom:10px;
    padding:5px;
`
const Button = styled.button`
    background-color: ${props=>props.color};
    color: white;
    text-transform: uppercase;
`
const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom:10px;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
`
const Title = styled.h2`

`

const Form = () => {

    const materiaInitialState = {name:'',desc:'',size:'',amount:'',price:''};
    const [materia, setMateria] = useState(materiaInitialState);
    const {dataToUpdate, clicked} = useSelector((state) => state.updateM);

    const handleChange = e => {
        setMateria(prevState => {
            return {...prevState, [e.target.id]: e.target.value}
        })
        console.log(materia);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            const res = await api.crearMateria(materia);
            console.log(res.data);
        } catch(err){
            console.log(err);
        }
        setMateria(materiaInitialState);
    }

    useEffect(()=>{
        const {createdAt, updatedAt, __v, _id, ...others } = dataToUpdate;
        setMateria(others);
    }, [clicked])


    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(dataToUpdate._id);
        console.log(materia);
        await api.updateMateria(dataToUpdate._id, materia)
        setMateria(materiaInitialState);
    }

    return(
        <Container>
            <FormContainer>
            <Title>Crear producto</Title>
            <PostForm onSubmit={e => handleSubmit(e)}>
                <InputContainer>
                    <Input placeholder='Nombre' id='name' value={materia.name} onChange={ e => handleChange(e)}/>
                    <Input width='60px' placeholder='Talla' id='size' value={materia.size} onChange={ e => handleChange(e)}/>
                    <Input width='80px' placeholder='Cantidad' id='amount' value={materia.amount} onChange={ e => handleChange(e)}/>
                    <Input width='90px' placeholder='Precio' id='price' value={materia.price} onChange={ e => handleChange(e)}/>
                </InputContainer>
                <Desc placeholder='Descripcion' id='desc' value={materia.desc} onChange={ e => handleChange(e)}/>
                <ButtonContainer>
                    <Button color='#33cc33' className="btn btn-success">Crear</Button>
                    <Button color='#00ace6' className="btn btn-primary" onClick={(e) => handleUpdate(e) }>Actualizar</Button>
                </ButtonContainer>
            </PostForm>
            </FormContainer>
        </Container>
    )
}


export default Form;