
import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import UserForm from './components/UserForm'
import UserDetails from './components/UserDetails';
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserForm/>}></Route>
      <Route path='/user-data' element={<UserDetails/>}></Route>
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
