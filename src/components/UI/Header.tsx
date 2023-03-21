import React, { useEffect, useState } from "react";
import { List } from './List';
import { Logo } from './Logo';
import { Pricelist } from "./Pricelist";
import { ContactsPhone } from "./ContactsPhone";
import { MailLink } from "./MailLink";

export function Header() {
	const menuLinks: string[] = ["О компании", "Доставка и оплата", "Возврат", "Контакты"];
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		if (isMobile) {
			setMobileArch();
		} else {
			setDesktopArch();
		}
	}, [isMobile]);

	window.addEventListener('resize', (e) => {
		if (window.innerWidth <= 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	});

	function handleBurgerClick(e: React.MouseEvent) {
		const burgerContent = document.querySelector('.top-header__row');
		const app = document.querySelector('.App');

		if (burgerContent && app) {
			if (burgerContent.classList.contains('_active')) {
				burgerContent.classList.remove('_active');
			} else {
				burgerContent.classList.add('_active');
			}
		}
	}
	
	return (
		<header className="header">
			<div className="header__top top-header">
				<div className="container">
					<div className="top-header__row">
						<div className="top-header__location location">
							<img src="/images/icons/location.svg" alt="location" className="location__icon" />
							<div className="location__address">
								<p className="bold">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
								<p>(Рынок Восточный)</p>
							</div>
						</div>
						<MailLink />
						<List class='menu-header' singleClass="top-header__menu" title={'Меню сайта: '} list={menuLinks} />
					</div>
				</div>
			</div>
			<div className="header__bottom bottom-header">
				<div className="container">
					<div className="bottom-header__row">
						<div className="bottom-header__burger burger">
							<button onClick={handleBurgerClick} className="burger__button">
								<span></span>
							</button>
						</div>
						<Logo class="bottom-header__logo" />
						<button type="button" className="bottom-header__catalog catalog">
							<span>Каталог</span>
							{isMobile ? 
								<img src="/images/icons/squares_mobile.svg" alt="squares" /> :
								<img src="/images/icons/squares.svg" alt="squares" />
							}
						</button>
						<form className="bottom-header__search-form search-form-header">
							<input type="text" placeholder="Поиск..." />
							<button type="submit">
								{isMobile ? 
									<img src="/images/icons/search_mobile.svg" alt="search" /> :
									<img src="/images/icons/search.svg" alt="search" />
								}
							</button>
						</form>
						<div className="bottom-header__support support">
							<ContactsPhone isMobile={isMobile} />
							<div className="support__image-box">
								{isMobile ? 
									<img src="/images/icons/phone.svg" alt="phone" /> :
									<img src="/images/support.png" alt="support" className="support__image" />
								}
								<div className="support__online-point"></div>
							</div>
						</div>
						<Pricelist class='bottom-header__pricelist' />
						<button type="button" className="bottom-header__cart cart">
							<div className="cart__image-box">
								<img src="/images/icons/cart.svg" alt="cart" className="cart__image" />
								<div className="cart__products-number">
									<span>3</span>
								</div>
							</div>
							<div className="cart__info">
								<p>Корзина</p>
								<p className="cart__sum">12 478 Т</p>
							</div>
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

function setMobileArch() {
	const bottomHeader = document.querySelector('.bottom-header__row');
	const topHeader = document.querySelector('.top-header__row');
	const pricelist = bottomHeader?.querySelector('.pricelist');
	const support = bottomHeader?.querySelector('.support');

	if (topHeader && pricelist) {
		topHeader.appendChild(pricelist);
	}

	if (topHeader && support) {
		topHeader.appendChild(support);
	}
}

function setDesktopArch() {
	const bottomHeader = document.querySelector('.bottom-header__row');
	const topHeader = document.querySelector('.top-header__row');
	const pricelist = topHeader?.querySelector('.pricelist');
	const support = topHeader?.querySelector('.support');
	const cart = bottomHeader?.querySelector('.cart');
	
	if (bottomHeader && support) {
		bottomHeader.appendChild(support);
	}

	if (bottomHeader && pricelist) {
		bottomHeader.appendChild(pricelist);
	}

	if (cart) {
		bottomHeader?.appendChild(cart);
	}
}