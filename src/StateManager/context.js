import React, { createContext, useContext, useReducer, useState } from 'react';
import reducer from './reducer';

const AppContext = createContext();
const URL = "https://samanbackend.onrender.com/"
// const URL = "http://localhost:4000/"
const initialState = {
    Userid: "",
    Username:"",
    Email: "",
    Cart:[],
    CartReadytoOrder:[
      {
        amount:0,
        product:[]
      }
    ],
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ ...state, dispatch, URL,loading,setLoading }}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
