export function ContactsPhone(props: {isMobile: boolean}) {
    return (
        <div className="support__info">
            {props.isMobile ? <p className="support__sales-dep">Отдел продаж</p> : null}
            <p className="support__phone-number">+7 (777) 490-00-91</p>
            <p className="support__work-times">время работы: <span>9:00-20:00</span></p>
            <a href="tel:+77774900091" className="support__call">
                {props.isMobile ?
                    <div className="support__call-image-box">
                        <img src="/images/icons/phone_white.svg" alt="phone" className="support__call-image" />
                    </div> : null
                }
                <span>Заказать звонок</span>
            </a>
        </div>
    );
}