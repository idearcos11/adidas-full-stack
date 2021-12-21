import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import * as api from '../../api/Produccion';
import { useDispatch } from 'react-redux';
import { setToInitial } from '../../redux/reducers/updatePanel';


const Container = styled.div``
const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    margin-top:30px;
`
const Title = styled.input`
    width:300px;
    padding:5px;
`
const Desc = styled.textarea`
    resize: none;
    width:300px;
    height: 80px;
    padding:5px;
`


const FormContainer = styled.div`
    
`
const Button = styled.button`
    text-transform: uppercase;
`


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

    function add(accumulator, a) {
        return accumulator + a;
    }
      

    const handleCreate = async (e) => {
        e.preventDefault();          
        let seleccionados = [];



        for (const element of panel ) {
            try{   
                const res = await api.fetchMateria(element._id);
                const cantidad = element.cantidad;  
                const carrito = {producto:res.data, cantidad:cantidad}
                const disponible = res.data.amount - cantidad;
                const vendidos = res.data.sold + cantidad;
                await api.updateMateria(element._id,{sold:vendidos, amount:disponible});
                seleccionados.push(carrito);
                console.log(seleccionados)
            } catch(err) {console.log(err)}
        }



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
                <Title onChange={ e => handleChange(e)} id='title' placeholder='Nombre' value={info.title}/>
                <Desc onChange={ e => handleChange(e)} id='desc' placeholder='Descripción' value={info.desc}/>
                <Button className='btn btn-success' onClick={ e => handleCreate(e)}>Crear</Button>
            </PostForm>
        </Container>
    )
}


export default Form;