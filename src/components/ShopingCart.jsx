import { TYPES } from "../actions/actions";
import { useReducer } from "react";
import { shoppingReducer, shoppingInitialState } from "../reducer/reducer";
import styles from '../styles/products.css?inline';
import Product from "./Product";
import CartItem from "./CartItem";


const ShoppingCart = () => {
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

    const {products, cart} = state

    const addToCart = (id) => {
        console.log(id)
        dispatch({ type: TYPES.ADD_TO_CART, payload: id });
    };


    const deleteFromCart = (id, all = false) => {
        console.log(id, all)
        // Explicar esto antes que la programación del reducer
        if (all) {
            dispatch({ type: TYPES.REMOVE_ALL_PRODUCTS, payload: id })
        } else {
            dispatch({ type: TYPES.REMOVE_ONE_PRODUCT, payload: id })
        }
    };



    const clearCart = () => {
        dispatch({ type: TYPES.CLEAR_CART });
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
            <button onClick={clearCart}>Limpiar Carrito</button>
            <div className="box">
                {cart.map((item, index) => <CartItem key={index}
                    data={item} deleteFromCart={deleteFromCart} />)}
            </div>
        </>
    );

};

export default ShoppingCart;
