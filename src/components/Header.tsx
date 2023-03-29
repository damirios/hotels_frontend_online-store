import React, { useEffect, useState } from "react";
import { List } from './UI/List';
import { Logo } from './UI/Logo';
import { Pricelist } from "./UI/Pricelist";
import { ContactsPhone } from "./UI/ContactsPhone";
import { MailLink } from "./UI/MailLink";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { closeDropDown } from "../store/slices/dropDownSlice";
import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";
import { Support } from "./UI/Support";

export function Header() {
	const menuLinks: string[] = ["О компании", "Доставка и оплата", "Контакты"];
	
	const cart = useTypedSelector(state => state.cart);
	const isDropDownOpen = useTypedSelector(state => state.dropDown.isOpen);
	const dispatch = useTypedDispatch();

	const [width, height] = useWindowSize();
	const [isMobile, setIsMobile] = useState(width <= 768);

	window.addEventListener('resize', (e) => {
		if (width <= 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	});

	function handleBurgerClick(e: React.MouseEvent) {
		const burgerContent = document.querySelector('.top-header__row');
		const app = document.querySelector('.App');

		if (isDropDownOpen) { dispatch(closeDropDown()) };

		if (burgerContent && app) {
			if (burgerContent.classList.contains('_active')) {
				burgerContent.classList.remove('_active');
			} else {
				burgerContent.classList.add('_active');
			}
		}
	}

	const { pathname } = useLocation();
	if (pathname.includes('/admin-page')) {
		return null;
	}
	
	return (
		<header className="header">
			<div className="header__top top-header">
				<div className="container">
					<div className="top-header__row">
						<div className="top-header__location location">
							<img src="./images/icons/location.svg" alt="location" className="location__icon" />
							<div className="location__address">
								<p className="bold">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
								<p>(Рынок Восточный)</p>
							</div>
						</div>
						{isMobile ? <Support isMobile={isMobile} /> : null}
						<MailLink class='top-header' image={true} />
						<List class='menu-header' singleClass="top-header__menu" 
						title={'Меню сайта: '} list={menuLinks} />
						{isMobile ? <Pricelist class='bottom-header__pricelist pricelist' /> : null}
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
						<Link to='/' className="bottom-header__catalog catalog">
							<span>Каталог</span>
							{isMobile ? 
								<img src="./images/icons/squares_mobile.svg" alt="squares" /> :
								<img src="./images/icons/squares.svg" alt="squares" />
							}
						</Link>
						<form className="bottom-header__search-form search-form-header">
							<input type="text" placeholder="Поиск..." />
							<button type="submit">
								{isMobile ? 
									<img src="./images/icons/search_mobile.svg" alt="search" /> :
									<img src="./images/icons/search.svg" alt="search" />
								}
							</button>
						</form>
						{isMobile ? null : <Support isMobile={isMobile} />}
						{isMobile ? null : <Pricelist class='bottom-header__pricelist pricelist' />}
						<Link to='/cart' className="bottom-header__cart cart">
							<div className="cart__image-box">
								<img src="./images/icons/cart.svg" alt="cart" className="cart__image" />
								<div className="cart__products-number">
									<span>{cart.productsInCart.reduce((prev, current) => prev + current.quantity, 0)}</span>
								</div>
							</div>
							<div className="cart__info">
								<p>Корзина</p>
								<p className="cart__sum">
									{cart.productsInCart.reduce((prev, current) => prev + current.product.price * current.quantity, 0)}
									<span> руб.</span>
								</p>
							</div>
						</Link>
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