import { TYPES } from "../actions/actions";
import { useReducer, useEffect } from "react";
import { shoppingReducer, shoppingInitialState } from "../reducer/reducer";
import styles from '../styles/products.css?inline';
import axios from "axios";
import Product from "./Product";
import CartItem from "./CartItem";


const ShoppingCart = () => {
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
    //state = {products:[],cart:[]} ---> state={products:[{},{},{,},{}], cart:[]}
    const {products, cart} = state

    //agregamos la función que toma la info de la db

    const updateState = async () => {
                                        
        const resProducts = await axios("http://localhost:3000/products"); //conseguime la lista de productos
       
        const resCart = await axios("http://localhost:3000/cart"); //conseguime los productos que estén en el carrito


        const newProduct = await resProducts.data //accedo al .data que me da axios, guardo esa info en una variable newProduct
        //axios.post('http://localhost:3000/productos", newProduct)
        
        const newCartItem = await resCart.data // accedo al .data que me da axios, guardo esa info en una variable newCartItem
    
        dispatch({type: TYPES.READ_STATE, payload: [newProduct, newCartItem]})
    }
    
    //agregamos el useEffect para que la función se dispare apenas se monta el componente
    useEffect(() => {
        updateState()
    }, [])
    
    const addToCart = (id) => {
        console.log(id)
        dispatch({ type: TYPES.ADD_TO_CART, payload: id });
        
    };


    const deleteFromCart = (id, all = false) => {
        console.log(id, all)
        
        if (all) {
            dispatch({ type: TYPES.REMOVE_ALL_PRODUCTS, payload: id })
        } else {
            dispatch({ type: TYPES.REMOVE_ONE_PRODUCT, payload: id })
        }
    };

    return (
        <>
            <h1>Carrito de Compras</h1>
            <h3>Productos</h3>
            <div className="product_div">
                {products.map((product) => <Product key={product.id}
                    data={product} addToCart={addToCart} />)}
            </div>
            <h3>Cart</h3>

            <button onClick={updateState}>Limpiar Carrito</button>

            <div className="product_div">
                {cart.map((item, index) => <CartItem key={index}
                    data={item} deleteFromCart={deleteFromCart} />)}
            </div>
        </>
    );

};

export default ShoppingCart;
