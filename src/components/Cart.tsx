import { useState } from "react";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { removeAllProductsFromCart } from "../store/slices/cartSlice";
import { CartList } from "./CartList";
import { Breadcrumbs } from "./UI/Breadcrumbs";


export function Cart() {
    const cart = useTypedSelector(state => state.cart);
    const totalPrice = cart.productsInCart.reduce((prev, current) => prev + current.product.price * current.quantity, 0);

    const [showThanks, setShowThanks] = useState(false);
    const dispatch = useTypedDispatch();

    function handleCloseThanks() {
        setShowThanks(false);
        dispatch(removeAllProductsFromCart());
        window.scrollTo(0, 0);
    }

    function handleCheckoutClick() {
        setShowThanks(true);
    }

    return (
        <div>
            <Breadcrumbs page='cart' />
            <div className="cart-page">
                <div className="container">
                    {cart.productsInCart.length !== 0 ? 
                        <div className="cart-page__column">
                            <h1 className="cart-page__title">Корзина</h1>
                            <CartList cartInfo={cart.productsInCart} />
                            <div className="cart-page__controls">
                                <button className="cart-page__checkout" onClick={handleCheckoutClick}>Оформить заказ</button>
                                <div className="cart-page__total-price">
                                    {totalPrice}
                                    <span> руб.</span>
                                </div>
                            </div>
                        </div> :
                        <div className="cart-page__empty-message">
                            В корзину пока ничего не добавлено
                        </div>
                    }
                    {showThanks ? 
                        <div className="cart-page__thanks thanks">
                            <div className="thanks__box">
                                <div onClick={handleCloseThanks} className="thanks__close-x"></div>
                                <button onClick={handleCloseThanks} className="thanks__close-button">
                                    <img src="./images/icons/ok.svg" alt="ok" />
                                </button>
                                <div className="thanks__title">
                                    Спасибо за заказ
                                </div>
                                <div className="thanks__subtitle">
                                    Наш менеджер свяжется с вами в ближайшее время
                                </div>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    );
}