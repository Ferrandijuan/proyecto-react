import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useThemeHook } from './componentes/ThemePage'
import Header from './componentes-page/header';

function App() {
  const [theme] = useThemeHook();
  return (
    <main className={theme? 'bg-black': 'bg-light-2'} style={{ height: '100vh', overflow: 'auto'}}>
      <Header/>
    </main>
  );
}

export default App;
