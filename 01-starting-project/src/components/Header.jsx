import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/button.jsx';
import CartContext from '../Store/StoreContext.jsx';
import UserProgressContext from '../Store/UserProgressContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNUmberOfItems, item)=>{
        return totalNUmberOfItems + item.quantity;
    },0);
    
    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Ama-zone restaurant" />
                <h1>Ama-zone Restaurant</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}