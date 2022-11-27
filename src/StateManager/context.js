import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const AppContext = createContext();
const URL = "https://saman.onrender.com/"
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
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ ...state, dispatch, URL }}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
