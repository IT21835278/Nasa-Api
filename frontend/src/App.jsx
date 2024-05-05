import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Provider } from 'react-redux';

import './App.css'
import Home from './Pages/Home'
import NEOPage from './Pages/NEOPage'
import MarsRoverCuriosity from "./Pages/MarsRoverCuriosity"
import STEdata from "./Pages/STEdata"
import Layout from "./component/layout/Layout"
import Login from "./Pages/Login"
import { store } from "./redux/store";
import Registration from "./Pages/Registration";


function App() {

  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/home" element={<Layout><Home/></Layout>}/>
        <Route path="/near-earth-object" element={<Layout><NEOPage/></Layout>}/>
        {/* <Route path="/test" element={<NasaPhoto/>}/> */}
        <Route path="/mars-rover-curiosity" element={<Layout><MarsRoverCuriosity/></Layout>}/>
        <Route path="/ste-data" element={<Layout><STEdata/></Layout>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
        {/* <Route path="/header" element={<NavigationBar/>}/> */}


      </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
