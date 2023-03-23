import { ProductType } from "../types/productDBType";

export function Products(props: {list: ProductType[]}) {
    return (
        <div className="catalog-content__products products">
            <ul className="products__list">
                {props.list.map(item => {
                    return (
                        <li className="products__item" key={item.barcode}>
                            <img src={item.image_url} alt="product" />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}