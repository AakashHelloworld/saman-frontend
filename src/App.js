import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import { SignIn } from './Page/SignIn';
import {LogIn} from "./Page/LogIn";
import Home from './Page/Home';
import ProductPage from './Page/ProductPage';
import Store from './Page/Store';
import Cart from './Page/Cart';
import Order from './Page/Order';
import Stores from './Page/Stores';
import OrderTrack from './Page/OrderTrack';
import Orders from './Page/Orders';
import SearchPage from './Page/SearchPage';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
         <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/product/:id" element={<ProductPage />}/>
         <Route path="/stores" element={<Stores />}/>
         <Route path="/store/:id" element={<Store />}/>
         <Route path='/cart' element={<Cart />} />
         <Route path='/order' element={<Order />} />
         <Route path='/ordertrack/:id' element={<OrderTrack />} />
         <Route path='/orders' element={<Orders/>} />
         <Route  path='/signup' element={<SignIn />}/>
         <Route  path='/login' element={<LogIn/>}/>
         <Route path='/products/search/:id' element={<SearchPage />} />
         </Routes>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="light" 
                />
    </div>
  );
}

export default App;
