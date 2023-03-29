import { Sort } from "./CustomSort/Sort";
import { filterFields } from "../data/filterFields";
import { FiltersTop } from "./Filters/FiltersTop";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { Products } from "./Products";
import { SidebarFilters } from "./Filters/SidebarFilters";
import { setCareTypesFilter } from "../store/slices/filtersSlice";
import { SelectedFilters } from "./UI/SelectedFilters";
import { Pagination } from "./Pagination";
import { fetchProducts, fetchPageProducts, sortProducts } from "../store/slices/productSlice";
import { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { Breadcrumbs } from "./UI/Breadcrumbs";

export function Content(props: {breadcrumbs?: string}) {
	const productsState = useTypedSelector(state => state.products);
	const filters = useTypedSelector(state => state.filters);
	const pagination = useTypedSelector(state => state.pagination);
	const sort = useTypedSelector(state => state.sort);
	const dispatch = useTypedDispatch();

	let productsList = productsState.list;
	const allManufacturers = Array.from(new Set(productsList.map(item => item.manufacturer)));

	const [firstRenderDone, setFirstRenderDone] = useState(false);
	const [firstRenderDoneFiltered, setFirstRenderDoneFiltered] = useState(false);
	
	const isDropDownOpen = useTypedSelector(state => state.dropDown.isOpen);
    const [width, height] = useWindowSize();

	useEffect(() => {
		if (firstRenderDone) {
			dispatch(fetchProducts({
				maxPrice: filters.price_max,
				minPrice: filters.price_min,
				selectedManufacturers: filters.manufacturersList,
				careTypes: filters.careTypes,
				shownProductsNumber: pagination.visibleProductsNumber,
				page: pagination.currentPage,
				sortParams: {
					order: sort.order,
					param: sort.param
				}
			}));
		} else {
			setFirstRenderDone(true);
		}
	}, [filters]);

	useEffect(() => {
		dispatch(sortProducts({
			sortParam: sort.param,
			sortOrder: sort.order
		}));
	}, [sort]);

	useEffect(() => {
		if (firstRenderDoneFiltered) {
			dispatch(fetchPageProducts({
				page: pagination.currentPage,
				productsNumber: pagination.visibleProductsNumber
			}));		
		} else {
			setFirstRenderDoneFiltered(true);
		}
	}, [pagination]);

	function handleCareTypeFilterClick(e: { target: HTMLInputElement }) {
		const clickedFilter = e.target;
		const filterValue = clickedFilter.dataset.value;
		const careTypes = filters.careTypes;

		if (filterValue) {
			const isActive = careTypes.includes(filterValue);
			if (isActive) {
				const index = careTypes.findIndex(el => el === filterValue);
				if (index === 0) {
					dispatch(setCareTypesFilter(careTypes.slice(1, careTypes.length)));
				} else if (index === careTypes.length - 1) {
					dispatch(setCareTypesFilter(careTypes.slice(0, careTypes.length - 1)));
				} else {
					dispatch(setCareTypesFilter(careTypes.slice(0, index).concat(careTypes.slice(index + 1, careTypes.length))));
				}
			} else {
				dispatch(setCareTypesFilter([...careTypes, filterValue]));
			}
		}
	}

	return(
		<main className="content">
			<Breadcrumbs page='catalog' />
			<div className="content__catalog catalog-content">
				<div className="container">
					<div className="catalog-content__menu">
						<div className="catalog-content__top">
							{width <= 768 && productsState.status === 'loading' ? 
								null : <div className="catalog-content__title">Косметика и гигиена <span>{}</span></div>
							}
							{width <= 768 ? null : <Sort />}
						</div>
						{width <= 768 && productsState.status === 'loading' ? 
							null : <FiltersTop top={true} className='catalog-content__filters-top' 
							clickHandler={handleCareTypeFilterClick} list={filterFields} />
						}
						{width <= 768 && !isDropDownOpen && productsState.status !== 'loading' ? <Sort /> : null}
						<SelectedFilters />
						<SidebarFilters clickHandler={handleCareTypeFilterClick} />
						<Products />
						<Pagination />
						{!isDropDownOpen ? <div className="catalog-content__bottom-info bottom-info">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, 
								vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. 
								Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. 
								Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
							</div> : null
						}
					</div>
				</div>
			</div>
		</main>
	)
}