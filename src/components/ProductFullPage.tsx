import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { sizeTypes } from "../types/productDBType";

export function ProductFullPage() {
    const params = useParams();
    const { pathname } = useLocation();

    const product = useTypedSelector(state => state.products.list).find(product => product.barcode === params.id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(false);
    const [count, setCount] = useState(1);

    function handleDescriptionClick() {
        setIsDescriptionOpen(!isDescriptionOpen);
    }

    function handleCharacteristicsClick() {
        setIsCharacteristicsOpen(!isCharacteristicsOpen);
    }

    function handleIncrease() {
        setCount(count + 1);
    }

    function handleDecrease() {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    let sizeIconURL = `/images/icons/size_${product?.sizeType}.svg`; // volume or weight
    if (product) {
        return (
            <div className="product-page">
                <div className="container">
                    <div className="product-page__row">
                        <div className="product-page__full-product full-product">
                            <div className="full-product__image-box">
                                <img src={product.image_url} alt={`product-${product.barcode}`} />
                            </div>
                            <div className="full-product__info">
                                <div className="full-product__in-stock-status">В наличии</div>
                                <div className="full-product__title">
                                    <span>{product.title}.</span> {product.description}
                                </div>
                                <div className="full-product__size">
                                    <img src={sizeIconURL} alt='size icon' />
                                    <p>{product.size} {product.sizeType === sizeTypes.volume ? 'мл' : 'г'}</p>
                                </div>
                                <div className="full-product__purchase-block">
                                    <div className="full-product__price">
                                        {product.price.toString().replace('.', ',')} руб.
                                    </div>
                                    <div className="full-product__quantity quantity">
                                        <button type="button" onClick={handleDecrease} className="quantity__decrease">-</button>
                                        <div className="quantity__count">{count}</div>
                                        <button type="button" onClick={handleIncrease} className="quantity__increase">+</button>
                                    </div>
                                    <button type='button' className="full-product__cart-button">
                                        <span>В корзину </span>
                                        <img src="/images/icons/cart_white.svg" alt="cart" />
                                    </button>
                                </div>
                                <div className="full-product__add-info add-info">
                                    <button type="button" className="add-info__share">
                                        <img src="/images/icons/share.svg" alt="share" />
                                    </button>
                                    <div className="add-info__free-delivery">
                                        При покупке от <span>10 000 ₸</span> бесплатная доставка по Кокчетаву и области
                                    </div>
                                    <button className="add-info__pricelist">
                                        <span>Прайс-лист</span>
                                        <img src="/images/icons/download_black.svg" alt="download" />
                                    </button>
                                </div>
                                <div className="full-product__params params">
                                    <div className="params__param params__manufacturer">
                                        Производитель: <span>{product.manufacturer}</span>
                                    </div>
                                    <div className="params__param params__brand">
                                        Бренд: <span>{product.brand}</span>
                                    </div>
                                    <div className="params__param params__vendor">
                                        Артикул: <span>{product.barcode.slice(0, 6)}</span>
                                    </div>
                                    <div className="params__param params__barcode">
                                        Штрихкод: <span>{product.barcode}</span>
                                    </div>
                                </div>
                                <div className="full-product__description">
                                    <h1 onClick={handleDescriptionClick}>
                                        <span>Описание</span>
                                        <img src="/images/icons/triangle_down.svg" alt="triangle" />
                                    </h1>
                                    <div className={`${isDescriptionOpen ? 'shown' : ''}`}>
                                        Какое-то крутое описание товара
                                    </div>
                                </div>
                                <div className="full-product__characteristics">
                                    <h1 onClick={handleCharacteristicsClick}>
                                        <span>Характеристики</span>
                                        <img src="/images/icons/triangle_down.svg" alt="triangle" />
                                    </h1>
                                    <ul className={`${isCharacteristicsOpen ? 'shown' : ''}`} >
                                        <li>Характеристика 1: <span>значение 1</span></li>
                                        <li>Характеристика 2: <span>значение 2</span></li>
                                        <li>Характеристика 3: <span>значение 3</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="product-page">
                Товара не найдено.
            </div>
        )
    }
}