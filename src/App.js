import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useThemeHook } from './componentes/ThemePage'
import Header from './componentes-page/NavBar';
import { Router } from "@reach/router";

import Home from './componentes-page/ItemListContainer';
import Carrito from './componentes-page/Carrito';


function App() {
  const [theme] = useThemeHook();
  return (
    <main className={theme? 'bg-black': 'bg-light-2'} style={{ height: '100vh', overflowY: 'auto'}}>
      <Header/>
      <Router>
        <Home path="/" />
        <Carrito path="/Carrito" />
      </Router>
    </main>
  );
}

export default App;
