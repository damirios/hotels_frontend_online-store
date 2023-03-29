import React from "react";
import { List } from './UI/List';
import { Logo } from './UI/Logo';
import { Pricelist } from "./UI/Pricelist";
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
						{width <= 768 ? <Support isMobile={width <= 768} /> : null}
						<MailLink class='top-header' image={true} />
						<List class='menu-header' singleClass="top-header__menu" 
						title={'Меню сайта: '} list={menuLinks} />
						{width <= 768 ? <Pricelist class='bottom-header__pricelist pricelist' /> : null}
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
							{width <= 768 ? 
								<img src="./images/icons/squares_mobile.svg" alt="squares" /> :
								<img src="./images/icons/squares.svg" alt="squares" />
							}
						</Link>
						<form className="bottom-header__search-form search-form-header">
							<input type="text" placeholder="Поиск..." />
							<button type="submit">
								{width <= 768 ? 
									<img src="./images/icons/search_mobile.svg" alt="search" /> :
									<img src="./images/icons/search.svg" alt="search" />
								}
							</button>
						</form>
						{width <= 768 ? null : <Support isMobile={width <= 768} />}
						{width <= 768 ? null : <Pricelist class='bottom-header__pricelist pricelist' />}
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