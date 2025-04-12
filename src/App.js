import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Component/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <>
   <Navbar/>
   <Outlet/> 
   <Footer/>
   </>
  );
}

export default App;
