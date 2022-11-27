

const reducer = (state, action)=>{
    switch(action.type){
        case "UPDATE_USER": {
            const geting_data = action.payload;
            return {...state, ...geting_data}
        }
        case "UPDATE__CART":{
            const Cart = action.payload.Cart;
            const CartAmount = action.payload.Amount;
            console.log(CartAmount, action.payload)
            return {...state, Cart, CartAmount}
        }
        case "ADDSUB_CART":{
            const Cart = action.payload.Cart;
            const CartAmount = action.payload.Amount;
            // console.log(action.payload)
            if(Cart.length){
                return {...state, Cart, CartAmount}
            }
        }
        case "READY_TO_CART":{
            const CartReadytoOrder =action.payload;
            return{...state, CartReadytoOrder}
        }
        case "Run_reducer":{
            return {...state}
        }
    }
}

export default reducer