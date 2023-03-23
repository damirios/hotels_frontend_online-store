import { ProductType, sizeTypes } from "../types/productDBType";
import { Link } from 'react-router-dom';

export function SingleProduct(props: {product: ProductType}) {
    const { product } = props;
    let sizeIconURL = `/images/icons/size_${product.sizeType}.svg`; // volume or weight

    return (
        <li className="products__item single-product">
            <div className="single-product__image-box">
                <img src={product.image_url} alt={product.title} />
            </div>
            <div className="single-product__info">
                <div className="single-product__size">
                    <img src={sizeIconURL} alt='size icon' />
                    <p>{product.size} {product.sizeType === sizeTypes.volume ? 'мл' : 'г'}</p>
                </div>
                <Link to={`/products/${product.barcode}`} className="single-product__title">
                    <span>{product.title}.</span> {product.description}
                </Link>
                <div className="single-product__barcode">
                    Штрихкод: <span>{product.barcode}</span>
                </div>
                <div className="single-product__manufacturer">
                    Производитель: <span>{product.manufacturer}</span>
                </div>
                <div className="single-product__brand">
                    Бренд: <span>{product.brand}</span>
                </div>
                <div className="single-product__purchase-block">
                    <div className="single-product__price">
                        {product.price.toString().replace('.', ',')} руб.
                    </div>
                    <button type='button' className="single-product__cart-button">
                        <span>В корзину </span>
                        <img src="/images/icons/cart_white.svg" alt="cart" />
                    </button>
                </div>
            </div>
        </li>
    );
}