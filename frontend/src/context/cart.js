import React, {useState, useContext,createContext, useEffect} from 'react';


export const CartContext = createContext()

export const CartProvider = ({children})=> {
    const [cart, setCart]= useState([]);
    
    useEffect(() =>{
      let existingCartItem = localStorage.getItem('cart');
      if(existingCartItem) setCart(JSON.parse(existingCartItem));
    },[]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
};

const useCart = () => useContext(CartContext);
export {useCart};