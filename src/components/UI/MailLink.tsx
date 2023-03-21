export function MailLink() {
    return (
        <a href="mailto:opt.sultan@mail.ru" className="top-header__mail mail">
            <img src="/images/icons/mail.svg" alt="mail" className="mail__icon" />
            <div className="mail__email">
                <p className="bold">opt.sultan@mail.ru</p>
                <p>На связи в любое время</p>
            </div>
        </a>
    );
}