import { Link, useLocation } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ProductType } from "../types/productDBType";
import { getProductsFromLocalStorage } from "../utilityFunctions/localStorageFunctions";
import { AdminPageListItem } from "./AdminPageListItem";


export function AdminPage() {
    const { pathname } = useLocation();
    const allProducts: ProductType[] = useTypedSelector(state => state.products.list);

    return (
        <div className="admin-page">
            <div className="admin-page__header">
                <div className="container">
                    <div className="header-admin">
                        <ul>
                            <li>
                                <Link to="/" >Вернуться в магазин</Link>
                            </li>
                            <li>
                                <Link to="/admin-page-create" >Создать товар</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="admin-page__content">
                <div className="container">
                    <div className="content-admin">
                        <h1 className="content-admin__title">Все товары</h1>
                        <ul className="content-admin__list">
                            {allProducts.map(el => <AdminPageListItem key={el.barcode} product={el} />)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="admin-page__footer">
                Админ-панель интернет-магазина
            </div>
        </div>
    );
}