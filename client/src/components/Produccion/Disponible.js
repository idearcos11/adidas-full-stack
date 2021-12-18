import * as api from '../../api/Produccion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePanel } from '../../redux/reducers/updatePanel';


const Disponible = () => {

    const dispatch = useDispatch()

    const {panel} = useSelector(state => state.updateP);

    const [materias, setMaterias] = useState([]);

    const getMaterias = async () => {
        try{
            const res = await api.fetchMaterias();
            setMaterias(res.data);
        } catch (err){console.log(err)}
    }

    getMaterias();

    const handleAgregar= async (e) => {

        const id = e.target.id;
        
        let inList = false;

        for(let i=0; i<panel.length; i++){
            if(panel[i]._id === id){
                inList = true
                i=panel.length;
            }
        }

        if (!inList) {
            try{
                const res = await api.fetchMateria(id);
                const {_id, name} = res.data;
                const test = {_id, name, cantidad:2};
                dispatch(updatePanel(test)); 
            } catch(err){console.log(err)}
            console.log(panel)
        }
    }

    const mapping = (materia) => {
        return(
            <tr>
                <td>{materia.name}</td>
                <td>{materia.amount}</td>
                <td><button id={materia._id} onClick={e => handleAgregar(e)}>Agregar</button></td>
            </tr>
        )
    }


    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map(mapping)}
                </tbody>
            </table>
        </div>
    );
}

export default Disponible;