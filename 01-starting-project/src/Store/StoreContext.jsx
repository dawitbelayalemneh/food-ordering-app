/*
import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return{ ...state, items: updatedItems }
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        if (existingCartItemIndex === -1) {
            return state; 
        }

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems = [...state.items];

        if (existingCartItem === 1) {
            //const updatedItems =[...state.items];
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem, quantity: existingCartItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem ;
        }
        return {...state, items: updatedItems};
  
    }

    return state;
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item) {
        dispatchCartAction({type: 'ADD_ITEM', item});
    }

    function removeItem(id) {
        dispatchCartAction({type: 'REMOVE_ITEM', id});
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    };

    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );
}

export default CartContext;

*/

import React, { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        if (existingCartItemIndex === -1) {
            return state;
        }

        let updatedItems = [...state.items];

        if (updatedItems[existingCartItemIndex].quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...updatedItems[existingCartItemIndex],
                quantity: updatedItems[existingCartItemIndex].quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        // Filter out items with quantity less than 1
        updatedItems = updatedItems.filter(item => item.quantity >= 1);

        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    function clearCart() {
        //dispatchCartAction({ type: 'CLEAR_CART' });
        dispatchCartAction({type: 'CLEAR_CART'});
    } 

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );
}

export default CartContext;