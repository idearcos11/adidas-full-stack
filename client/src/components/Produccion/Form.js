import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import * as api from '../../api/Produccion';
import { useDispatch } from 'react-redux';
import { setToInitial } from '../../redux/reducers/updatePanel';

const Container = styled.div``
const PostForm = styled.form``
const Title = styled.input``
const Desc = styled.textarea`
    resize: none;
`
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    margin-top:30px;
`
const Button = styled.button``


const Form = () => {

    const initialState = {title:'', desc: ''};
    const dispatch = useDispatch();
    const [info, setInfo] = useState(initialState);
    const {panel} = useSelector(state => state.updateP);

    const handleChange = e => {
        setInfo(prevInfo => {
            return {...prevInfo, [e.target.id]: e.target.value}
        })
        console.log(info);
    }

    const handleCreate = async (e) => {
        let seleccionados = [];
        e.preventDefault();
        panel.forEach( async element=>{
            try{   
                console.log(element._id)
                const res = await api.fetchMateria(element._id);
                const cantidad = element.cantidad;  
                const carrito = {producto:res.data, cantidad:cantidad}
                const disponible = res.data.amount - cantidad;
                const vendidos = res.data.sold + cantidad;
                await api.updateMateria(element._id,{sold:vendidos, amount:disponible});
                seleccionados.push(carrito);
                console.log(seleccionados);
            } catch(err) {console.log(err)}
        })

        const postData = {titulo:info.title, desc:info.desc, productos: seleccionados};
        console.log(postData);

        try{
            await api.createOrden(postData)
        } catch(err) {console.log(err)}

        setInfo(initialState);
        dispatch(setToInitial());
    }

    return(
        <Container>
            <PostForm>
                <FormContainer>
                    <Title onChange={ e => handleChange(e)} id='title' placeholder='Title' value={info.title}/>
                    <Desc onChange={ e => handleChange(e)} id='desc' placeholder='Description' value={info.desc}/>
                    <Button onClick={ e => handleCreate(e)}>Crear</Button>
                </FormContainer>
            </PostForm>
        </Container>
    )
}


export default Form;