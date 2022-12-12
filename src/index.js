import React from 'react';
import ReactDOM from 'react-dom/client'
import { render } from 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemePage } from './componentes/ThemePage';
import { CartProvider } from 'react-use-cart';

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAPurpVjUZBVmbrrXWNs6LfkTBi5keNew8",

  authDomain: "juanecommerce-68c7b.firebaseapp.com",

  projectId: "juanecommerce-68c7b",

  storageBucket: "juanecommerce-68c7b.appspot.com",

  messagingSenderId: "204403268108",

  appId: "1:204403268108:web:873f2febd6f1b1fb10ac29"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

render(
  <React.StrictMode>
    <ThemePage>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemePage>
  </React.StrictMode>
, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
