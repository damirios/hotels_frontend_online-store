import { Sort } from "./CustomSort/Sort";
import { filterFields } from "../data/filterFields";
import { FiltersTop } from "./Filters/FiltersTop";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { fetchProducts } from "../store/slices/productSlice";
import { Products } from "./Products";
import { SidebarFilters } from "./Filters/SidebarFilters";
import { addCareType, removeCareType } from "../store/slices/filtersSlice";
import { isSubarray } from "../utilityFunctions/isSubarray";

export function Content(props: {breadcrumbs?: string}) {
	let productsList = useTypedSelector(state => state.products.list);
	const filters = useTypedSelector(state => state.filters);
	const dispatch = useTypedDispatch();
	
	const allManufacturers = Array.from(new Set(productsList.map(item => item.manufacturer)));
	
	// фильтруем список товаров
	if (filters.careTypes.length !== 0) {
		productsList = productsList.filter(product => isSubarray(product.careTypes, filters.careTypes));
	}
	if (filters.manufacturersList.length !== 0) {
		productsList = productsList.filter(product => filters.manufacturersList.includes(product.manufacturer));
	}
	if (filters.price_min.trim().length > 0) {
		const minPrice = +filters.price_min.trim();
		const maxPrice = filters.price_max.trim().length > 0 ? +filters.price_max.trim() : null;
		productsList = productsList.filter(product => product.price >= minPrice && (maxPrice === null || product.price <= maxPrice));
	} else if (filters.price_max.trim().length > 0) {
		const minPrice = 0;
		const maxPrice = +filters.price_max.trim();
		productsList = productsList.filter(product => product.price >= minPrice && product.price <= maxPrice);
	}


	function handle() {
		dispatch(fetchProducts());
	}

	function handleCareTypeFilterClick(e: { target: HTMLInputElement }) {
		const clickedFilter = e.target;
		const filterValue = clickedFilter.dataset.value;

		if (filterValue) {
			const isActive = filters.careTypes.includes(filterValue);
			if (isActive) {
				dispatch(removeCareType(filterValue));
			} else {
				dispatch(addCareType(filterValue));
			}
		}
	}
	
	return(
		<main className="content">
			<div className="content__breadcrumbs breadcrumbs">
				<div className="container">
					<ul className="breadcrumbs__list">
						<li className="breadcrumbs__item">
							<a href="#">Главная</a>
						</li>
						<li className="breadcrumbs__item">
							<a href="#">Главная</a>
						</li>
						<li className="breadcrumbs__item">
							<a href="#">Главная</a>
						</li>
						<li className="breadcrumbs__item">
							<a href="#">Главная</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="content__catalog catalog-content">
				<div className="container">
					<div className="catalog-content__menu">
						<div className="catalog-content__top">
							<div className="catalog-content__title">Косметика и гигиена <span>{}</span></div>
							<Sort />
						</div>
						<FiltersTop className='catalog-content__filters-top' clickHandler={handleCareTypeFilterClick} 
							list={filterFields} />
						{/* <div className="catalog-content__filters-top"></div> */}
						<SidebarFilters allManufacturers={allManufacturers} clickHandler={handleCareTypeFilterClick} />
						<Products list={productsList} />
						<div className="catalog-content__pagination pagination">1 2 3 4 5</div>
						<div className="catalog-content__bottom-info">bottom info</div>
					</div>
				</div>
			</div>
		</main>
	)
}