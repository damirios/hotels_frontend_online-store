import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="not-found-page">
            <div className="container">
                <div className="not-found-page__info">
                    <p>Ошибка 404!</p>
                    <p>Такой страницы не существует</p>
                </div>
                <Link to='/'>Вернуться на главную</Link>
                <div className="not-found-page__image-box">
                    <img src='./images/404.png' alt="404" />
                </div>
            </div>
        </div>
    );
}