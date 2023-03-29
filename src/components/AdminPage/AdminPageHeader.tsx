import { Link } from "react-router-dom";


export function AdminPageHeader(props: {onAdminMain: boolean}) {


    return (
        <div className="admin-page__header">
            <div className="container">
                <div className="header-admin">
                    <ul>
                        <li>
                            <Link to="/admin-page-create" >Создать товар</Link>
                        </li>
                        {props.onAdminMain ? null : <li><Link to="/admin-page" >Админ-панель</Link></li>}
                        <li className="to-right">
                            <Link to="/" >Вернуться в магазин</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}