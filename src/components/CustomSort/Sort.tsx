import { useState } from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { sortProducts } from "../../store/slices/productSlice";

export function Sort() {
    const [selectOption, setSelectOption] = useState('title_asc');
    const dispatch = useTypedDispatch();
    

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        setSelectOption(value);

        const [sortParam, sortOrder] = value.split('_');
        dispatch(sortProducts({sortParam, sortOrder}));
    }

    return (
        <div className="catalog-content__sort sort-content">
            <form className="sort-content__form">
                <label htmlFor="sort_select" className="sort-content__label">Сортировка: </label>
                <select id="sort_select" className="sort-content__select" onChange={handleSelect} value={selectOption}>
                    <option value="title_asc" className="sort-content__option sort-content__option_name-asc">
                        по названию (по возрастанию)
                    </option>
                    <option value="title_desc" className="sort-content__option sort-content__option_name-desc">
                    по названию (по убыванию)
                    </option>
                    <option value="price_asc" className="sort-content__option sort-content__option_price-asc">
                        по цене (по возрастанию)
                    </option>
                    <option value="price_desc" className="sort-content__option sort-content__option_price-desc">
                        по цене (по убыванию)
                    </option>
                </select>
            </form>
        </div>
    );
}