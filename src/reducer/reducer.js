import { TYPES } from "../actions/actions";

export const shoppingInitialState = {
    products: [],
    cart: [],
};


export function shoppingReducer(state, action) {
    
    switch (action.type) {
        case TYPES.READ_STATE: {
            return {
                ...state, //me traigo todo el estado, que inicialmente es = {products:[],cart:[]}
                products: action.payload[0],//agregale a state.products : [{id:1,name:pizza,price:10},{id:2,name:ps5,price:1200},{},{},{}]
                cart: action.payload[1]//agregale a state.cart: []
            }
        }
        case TYPES.ADD_TO_CART: {
            let newItem = state.products.find(
                (product) => product.id === action.payload
            );
            let itemInCart = state.cart.find((item) => item.id === newItem.id);
            return itemInCart
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === newItem.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                }
                : {
                    ...state,
                    cart: [...state.cart, { ...newItem, quantity: 1 }],
                };

        }
        case TYPES.REMOVE_ONE_PRODUCT: {
            let itemToDelete = state.cart.find((item) => item.id === action.payload);

            return itemToDelete.quantity > 1
                ? {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    ),
                }
                : {
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.payload)
                };
        }
        case TYPES.REMOVE_ALL_PRODUCTS: {
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        }
        default:
            return state;
    }
}

