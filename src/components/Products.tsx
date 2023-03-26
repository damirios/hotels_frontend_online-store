import { useTypedSelector } from "../hooks/useTypedSelector";
import { SingleProduct } from "./SingleProduct";

export function Products() {
    const productsState = useTypedSelector(state => state.products);
    const productsToShow = productsState.pageList;
    const status = productsState.status;

    const emptyResult = productsToShow.length === 0 ?
        <div className="products__empty">Товаров по заданным условиям не найдено</div> : null;

    const result = status === 'loading' ? <div className="catalog-content__loading">loading...</div> : 
        <div className="catalog-content__products products">
            {productsToShow.length !== 0 ? 
                <ul className="products__list">
                    {productsToShow.map(item => <SingleProduct key={item.barcode} product={item} />)}
                </ul> : null
            }
            
            {emptyResult}
        </div>
    
    return result;
}