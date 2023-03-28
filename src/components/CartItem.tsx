import { useEffect, useState } from "react";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { changeQuantityInCart, removeProductFromCart } from "../store/slices/cartSlice";
import { ProductType, sizeTypes } from "../types/productDBType";


export function CartItem(props: {product: ProductType, quantity: number}) {
    const {product, quantity} = props;
    let sizeIconURL = `/images/icons/size_${product?.sizeType}.svg`; // volume or weight

    const [count, setCount] = useState(quantity);
    const [showDispatchButton, setShowDispatchButton] = useState(false);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (count !== quantity) {
            setShowDispatchButton(true);
        }
    }, [count]);

    function handleIncrease() {
        setCount(count + 1);
    }

    function handleDecrease() {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    function handleDispatchButtonClick() {
        dispatch(changeQuantityInCart({barcode: product.barcode, count}));
        setShowDispatchButton(false);
    }

    function handleRemoveClick() {
        dispatch(removeProductFromCart(product.barcode));
    }

    return (
        <li className="cart-page__item item-cart">
            <div className="item-cart__image-box">
                <img src={product.image_url} alt="product_image" />
            </div>
            <div className="item-cart__info">
                <div className="item-cart__size">
                    <img src={sizeIconURL} alt='size icon' />
                    <p>{product.size} {product.sizeType === sizeTypes.volume ? 'мл' : 'г'}</p>
                </div>
                <div className="item-cart__title">{product.title}</div>
                <div className="item-cart__description">{product.description}</div>
            </div>
            <div className="item-cart__quantity quantity-cart">
                <button type="button" onClick={handleDecrease} className="quantity-cart__decrease">-</button>
                <div className="quantity-cart__count">{count}</div>
                <button type="button" onClick={handleIncrease} className="quantity-cart__increase">+</button>         
                {showDispatchButton ? 
                    <div className="item-cart__dispatch">
                        <div>Изменить количество товара с <i>{quantity}</i> на <i>{count}</i>? </div>
                        <button onClick={handleDispatchButtonClick}>Изменить</button>
                    </div> : null
                }
            </div>
            <div className="item-cart__prices prices-cart">
                <span className="prices-cart__single-item-price">{product.price}</span>
                <span> x </span>
                <span className="prices-cart__quantity">{quantity}</span>
                <span> = </span>
                <span className="prices-cart__total-price">{product.price * quantity}</span>
                <span className="prices-cart__currency"> руб.</span>
            </div>
            <div className="item-cart__remove-button-box">
                <button type="button" onClick={handleRemoveClick} className="item-cart__remove-button">
                    <img src="/images/icons/bin.svg" alt="bin" />
                </button>
            </div>
        </li>
    );
}