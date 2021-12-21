import CrearMateria from './pages/Inventario/Crear';
import CrearOrden from './pages/Produccion/Crear';
import DashboardInv from './pages/Inventario/Dashboard';
import Reporte from './pages/Inventario/Reporte';
import DashboardProd  from './pages/Produccion/Dashboard';
import Despachado from './pages/Produccion/Despachado';
import PorDespachar from './pages/Produccion/PorDespachar';
import Ordenes from './pages/Produccion/Ordenes';
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Orden from './pages/Produccion/Orden';



function App() {

  const currentUser = useSelector(state => state.user.currentUser.currentUser); 
  console.log(currentUser);
  
  if(currentUser){
    console.log('hay usuario');
  } else {
    console.log('no hay usuario')
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={currentUser ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/login' element={currentUser ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/dashboard' element={currentUser? (currentUser.role ==='inventario'? <DashboardInv /> :<DashboardProd />)  : <Login />}/>
        <Route path='/crear' element={currentUser? (currentUser.role ==='inventario'? <CrearMateria /> :<CrearOrden />)  : <Login />} />
        <Route path='/reporte' element={currentUser? (currentUser.role ==='inventario'? <Reporte /> :<Navigate to='/404' />)  : <Login />} />
        <Route path='/despachado' element={currentUser? (currentUser.role ==='produccion'? <Despachado /> :<Navigate to='/404' />)  : <Login />} />
        <Route path='/adespachar' element={currentUser? (currentUser.role ==='produccion'? <PorDespachar /> :<Navigate to='/404' />)  : <Login />} />
        <Route path='/ordenes' element={currentUser? (currentUser.role ==='produccion'? <Ordenes /> :<Navigate to='/404' />)  : <Login />} />
        <Route path='/ordenes/:id' element={currentUser? (currentUser.role ==='produccion'? <Orden /> :<Navigate to='/404' />)  : <Login />} />
        <Route path='/404' element={<h1>No estas autorizado</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
