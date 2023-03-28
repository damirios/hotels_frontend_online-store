import { List } from './List';
import { Logo } from './Logo';
import { Pricelist } from './Pricelist';
import { ContactsPhone } from './ContactsPhone';
import { MailLink } from './MailLink';
import { useLocation } from 'react-router-dom';

export function Footer() {

	const menuLinks: string[] = ["О компании", "Доставка и оплата", "Возврат", "Контакты"];
	const categoryLinks: string[] = ["Бытовая химия", "Косметика и гигиена", "Товары для дома", "Товары для детей и мам", "Посуда"];

	const { pathname } = useLocation();
	if (pathname === '/admin-page') {
		return null;
	}

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__row">
					<div className="footer__subscribe-logo">
						<Logo class='footer-logo' isWhite={true} />
						<div className="footer__company-description">
							Компания «Султан» — снабжаем розничные магазины товарами <span>"под ключ"</span> в Кокчетаве и Акмолинской области
						</div>
						<div className="footer__subscribe subscribe-footer">
							<p className="subscribe-footer__title">Подпишись на скидки и акции</p>
							<form className="subscribe-footer__form">
								<input type="text" className='subscribe-footer__input' placeholder='Введите ваш E-mail' />
								<button className="subscribe-footer__submit">
									<img src="/images/icons/arrow-right.svg" alt="arrow-right" />
								</button>
							</form>
						</div>
					</div>
					<div className="footer__lists">
						<List class='footer-list' list={menuLinks} title="Меню сайта: " />
						<List class='footer-list' list={categoryLinks} title="Категории: " />
					</div>
					<div className="footer__messengers-pricelist messengers-pricelist">
						<div className="messengers-pricelist__pricelist">
							<h1>Скачать прайс-лист:</h1>
							<Pricelist class='footer-pricelist' />
						</div>
						<div className="messengers-pricelist__messengers messengers">
							<h1>Связь в мессенджерах:</h1>
							<div className="messengers__buttons">
								<button className='messengers__whatsapp'>
									<img src="/images/icons/whatsapp.svg" alt="whatsapp" />
								</button>
								<button className='messengers__telegram'>
									<img src="/images/icons/telegram.svg" alt="telegram" />
								</button>
							</div>
						</div>
					</div>
					<div className="footer__contacts contacts">
						<h1 className="contacts__title">Контакты:</h1>
						<ContactsPhone isMobile={false} class='contacts' />
						<MailLink image={false} class='contacts' />
						<div className="contacts__cards">
							<a href="/">
								<img src="/images/icons/visa.svg" alt="visa" />
							</a>
							<a href="/">
								<img src="/images/icons/masterCard.svg" alt="masterCard" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}