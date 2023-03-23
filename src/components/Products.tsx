import { ProductType } from "../types/productDBType";
import { SingleProduct } from "./SingleProduct";

export function Products(props: {list: ProductType[]}) {
    return (
        <div className="catalog-content__products products">
            <ul className="products__list">
                {props.list.map(item => <SingleProduct key={item.barcode} product={item} />)}
            </ul>
        </div>
    );
}