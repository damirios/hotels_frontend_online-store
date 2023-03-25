import React, { useEffect, useState } from "react";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setShowProductsRange } from "../store/slices/productSlice";

export function Pagination() {
    const products = useTypedSelector(state => state.products); 
    const pagination = useTypedSelector(state => state.pagination);
    
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useTypedDispatch();
    
    const numberOfPages = Math.ceil(products.list.length / pagination.visibleProductsNumber);
    const keys = Array.from(Array(numberOfPages).keys());

    useEffect(() => {
        const fromProductNumber = (currentPage - 1) * pagination.visibleProductsNumber;
        const toProductNumber = fromProductNumber + pagination.visibleProductsNumber < products.list.length ? 
            fromProductNumber + pagination.visibleProductsNumber : products.list.length;

        dispatch(setShowProductsRange({from: fromProductNumber, to: toProductNumber}));
    }, [currentPage]);
    
    function handlePrevClick() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNextClick() {
        if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function handleArbitraryPageClick(e: React.MouseEvent<HTMLButtonElement>) {
        const pageNumber = (e.target as HTMLInputElement).dataset.pageNumber;
        if (pageNumber) {
            setCurrentPage(+pageNumber);
        }
    }

    return (
        <div className="catalog-content__pagination pagination">
            {numberOfPages > 1 ? 
                <div className="pagination__row">
                    <div className="pagination__prev" onClick={handlePrevClick}>
                        <img src="/images/icons/arrow_left_yellow.svg" alt="arrow_left" />
                    </div>
                    <ul className="pagination__list">
                        {keys.map(key => <li className="pagination__item" 
                            key={key}  >
                                <button data-page-number={key + 1} onClick={handleArbitraryPageClick}>{key + 1}</button>
                            </li>)}
                    </ul>
                    <div className="pagination__next" onClick={handleNextClick}>
                        <img src="/images/icons/arrow_right_yellow.svg" alt="arrow_right" />
                    </div>
                </div> : null
            }
        </div>
    );
}