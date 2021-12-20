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
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux';



function App() {
  console.log(useSelector(state => state.user)); 
  
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<DashboardInv />} />
        
      </Routes>
    </Router>
  );
}

export default App;
