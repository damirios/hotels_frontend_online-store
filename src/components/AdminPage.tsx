import { useLocation } from "react-router-dom";


export function AdminPage() {
    const { pathname } = useLocation();

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-page__title">Админка. Можно редактировать, добавлять, удалять товары.</div>

            </div>
        </div>
    );
}