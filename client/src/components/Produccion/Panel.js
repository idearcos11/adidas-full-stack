import { useSelector } from 'react-redux';
import {deleteItem, addQuantity, subtractQuantity} from '../../redux/reducers/updatePanel';
import { useDispatch } from 'react-redux';



const Panel = () => {
    const {panel} = useSelector(state => state.updateP);
    const dispatch = useDispatch()


    const handleDelete = (e) => {
        const id = e.target.id;
        for (let i=0; i<panel.length; i++){
            if (panel[i]._id === id){
                const index = i;
                dispatch(deleteItem(index));
                i=panel.length;
            }
        }
    }

    const modify = (e) => {
        const id = e.target.id;
        const index = panel.indexOf(panel.find(element => element._id === id));
        const action = e.target.name;
        action === 'add' ? dispatch(addQuantity(index)) : dispatch(subtractQuantity(index)) 
    }

    const mapping = (item) => {
        return(
            <tr>
                <td>{item.name}</td>
                <td>{item.cantidad}</td>
                <td>
                    <button onClick={e => modify(e)} id={item._id} name='add'>+</button>
                    <button id={item._id} onClick={e => modify(e)} id={item._id} name='subtract'>-</button>
                    <button id={item._id} onClick={e => handleDelete(e)}>Eliminar</button>
                </td>
            </tr>
        )
    }

    return(
        <table>
            <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Cantidad</td>
                    <td>Accion</td>
                </tr>
            </thead>
            {panel.map(mapping)}
        </table>
    );
}

export default Panel;