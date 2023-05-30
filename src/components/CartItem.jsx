import '../styles/products.css'


const CartItem = ({data, deleteFromCart}) => {

    let {id, name, price, quantity} = data;

    return (
        <div className="product">

            <h4>{name}</h4>

            <h5>U$D{price} x {quantity} = U$D{price * quantity}</h5>

            <button onClick={() => deleteFromCart(id)}>Eliminar uno</button>

            <button onClick={() => deleteFromCart(id, true)}>Eliminar todos</button>

        </div>
    )
}
export default CartItem



