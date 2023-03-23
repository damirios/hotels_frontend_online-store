import { Sort } from "./CustomSort/Sort";
import { filterFields } from "../data/filterFields";
import { FiltersTop } from "./Filters/FiltersTop";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { fetchProducts } from "../store/slices/productSlice";
import { Products } from "./Products";

export function Content(props: {breadcrumbs?: string}) {
	const productsList = useTypedSelector(state => state.product.list);

	const dispatch = useTypedDispatch();

	function handle() {
		dispatch(fetchProducts());
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
							<div className="catalog-content__title" onClick={handle}>Косметика и гигиена</div>
							<Sort />
						</div>
						<FiltersTop className='catalog-content__filters-top' list={filterFields} />
						{/* <div className="catalog-content__filters-top"></div> */}
						<div className="catalog-content__sidebar"></div>
						<Products list={productsList} />
						{/* <div className="catalog-content__products"></div> */}
						<div className="catalog-content__pagination pagination">1 2 3 4 5</div>
						<div className="catalog-content__bottom-info">bottom info</div>
					</div>
				</div>
			</div>
		</main>
	)
}