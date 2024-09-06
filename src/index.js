// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import rootReducer from "./Reducer";
import {configureStore} from "@reduxjs/toolkit"
import "./index.css";
import { Toaster } from "react-hot-toast";


const store = configureStore({
  reducer:rootReducer,
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <Provider store = {store}>
    <BrowserRouter>
         <App />
        <Toaster />
    </BrowserRouter>
    </Provider> 
  </React.StrictMode>
);
