import React, { useState } from "react";
import { FiltersTop } from "./FiltersTop";
import { filterFields } from "../../data/filterFields";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setFilters } from "../../store/slices/filtersSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export function SidebarFilters(props: {allManufacturers: string[], clickHandler: any}) {
    const initialFilters = useTypedSelector(state => state.filters);

    const [minValue, setMinValue] = useState(initialFilters.price_min);
    const [maxValue, setMaxValue] = useState(initialFilters.price_max);
    const [manufacturerInput, setManufacturerInput] = useState('');
    const [allManufacturers, setAllManufacturers] = useState(props.allManufacturers);
    const [allShown, setAllShown] = useState(false);
    const [maxShownItems, setMaxShownItems] = useState(4);
    const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(initialFilters.manufacturersList);

    const dispatch = useTypedDispatch();


    function handlePriceChange(e: { target: HTMLInputElement }) {
        const name = e.target.name;
        const valueStr = e.target.value;
        const value = +valueStr;

        if (name === 'price_min') {
            setMinValue(value);
        } else if (name === 'price_max') {
            setMaxValue(value);
            if (minValue > value) {
                setMinValue(value);
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
    }

    return (
        <div className="catalog-content__sidebar sidebar">
            <h1 className="sidebar__title">Подбор по параметрам</h1>
            <form className="sidebar__form" onSubmit={handleFilterSubmit}>
                <div className="sidebar__price">
                    <label htmlFor="price-min">Цена <span>руб.</span></label>
                    <div className="sidebar__price_inputs-box">
                        <input min={0} type="number" onChange={handlePriceChange} value={minValue} placeholder='0' 
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
                                        name="manufacturers" value={item} />
                                    <label htmlFor={`manufacturer_${item}`}>{item}</label>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="sidebar__manufacturer_show-hide" onClick={handleShowHideClick}>
                        {allShown ? "Свернуть" : "Показать всё"}
                    </p>
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