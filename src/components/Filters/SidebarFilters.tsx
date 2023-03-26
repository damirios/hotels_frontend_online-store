import React, { useState } from "react";
import { FiltersTop } from "./FiltersTop";
import { filterFields } from "../../data/filterFields";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { resetFilters, setFilters } from "../../store/slices/filtersSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setPageTo } from "../../store/slices/paginationSlice";
import { useNavigate } from "react-router-dom";

export function SidebarFilters(props: {allManufacturers: string[], clickHandler: any}) {
    const filters = useTypedSelector(state => state.filters);

    const [minValue, setMinValue] = useState<string>(filters.price_min);
    const [maxValue, setMaxValue] = useState<string>(filters.price_max);
    const [manufacturerInput, setManufacturerInput] = useState('');
    const [allManufacturers, setAllManufacturers] = useState(props.allManufacturers);
    const [allShown, setAllShown] = useState(false);
    const [maxShownItems, setMaxShownItems] = useState(4);
    const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(filters.manufacturersList);

    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    function handlePriceChange(e: { target: HTMLInputElement }) {
        const name = e.target.name;
        const valueStr = e.target.value;

        if (name === 'price_min') {
            setMinValue(valueStr);
        } else if (name === 'price_max') {
            setMaxValue(valueStr);
            if (minValue && minValue > valueStr) {
                setMinValue(valueStr);
            }
        }
    }

    function handleManufacturerChange(e: { target: HTMLInputElement }) {
        const value = e.target.value;
        setManufacturerInput(value);
        setAllManufacturers(props.allManufacturers.filter(item => item.toLowerCase().includes(value.toLowerCase())))
    }

    function handleShowHideClick(e: React.MouseEvent<HTMLParagraphElement>) {
        setAllShown(!allShown);
    }

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const changedValue = e.target.value;
        const newSelectedManufacturers = [...selectedManufacturers];
        if ( selectedManufacturers.includes(changedValue) ) {
            const index = newSelectedManufacturers.findIndex(el => el === changedValue);
            newSelectedManufacturers.splice(index, 1);
            setSelectedManufacturers(newSelectedManufacturers);
        } else {
            setSelectedManufacturers([...selectedManufacturers, changedValue]);
        }
    }

    function handleFilterSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(setFilters({list: selectedManufacturers, price_min: minValue, price_max: maxValue}));
        dispatch(setPageTo(1));
        navigate("/");
    }

    function handleFiltersReset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(resetFilters());
        setManufacturerInput('');
        setAllShown(false);
        setSelectedManufacturers([]);
        setMinValue('');
        setMaxValue('');
    }

    return (
        <div className="catalog-content__sidebar sidebar">
            <h1 className="sidebar__title">Подбор по параметрам</h1>
            <form className="sidebar__form" onSubmit={handleFilterSubmit} onReset={handleFiltersReset}>
                <div className="sidebar__price">
                    <label htmlFor="price-min">Цена <span>руб.</span></label>
                    <div className="sidebar__price_inputs-box">
                        <input min={0} type="number" onChange={handlePriceChange} 
                            value={minValue} placeholder='0' 
                            name="price_min" id="price-min" />
                        <span>-</span>
                        <input min={0} type="number" onChange={handlePriceChange} value={maxValue} placeholder='10 000' 
                            name="price_max" id="price-max"/>
                    </div>
                </div>
                <div className="sidebar__manufacturer">
                    <label htmlFor="manufacturer">Производитель</label>
                    <input type="text" value={manufacturerInput} placeholder="Поиск..." onChange={handleManufacturerChange} 
                        name="manufacturer" id="manufacturer" />
                    <ul>

                        {allManufacturers.map((item, index) => {
                            return (
                                <li key={item} className={(index >= maxShownItems && !allShown) ? 'hide' : ''}>
                                    <input type="checkbox" id={`manufacturer_${item}`} onChange={handleCheckboxChange}
                                        name="manufacturers" value={item} checked={selectedManufacturers.includes(item)} />
                                    <label htmlFor={`manufacturer_${item}`}>{item}</label>
                                </li>
                            );
                        })}
                    </ul>
                    {allManufacturers.length > maxShownItems ? 
                    <p className="sidebar__manufacturer_show-hide" onClick={handleShowHideClick}>
                        {allShown ? "Свернуть" : "Показать всё"}
                    </p> : null}
                </div>
                <div className="sidebar__controls">
                    <button type="submit" className="sidebar__submit">Показать</button>
                    <button type="reset" className="sidebar__reset">
                        <img src="/images/icons/bin.svg" alt="bin" />
                    </button>
                </div>
            </form>
            <FiltersTop list={filterFields} clickHandler={props.clickHandler} className='sidebar__filters-top' />
        </div>
    );
}