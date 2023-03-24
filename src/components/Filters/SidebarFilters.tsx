import React, { useState } from "react";
import { FiltersTop } from "./FiltersTop";
import { filterFields } from "../../data/filterFields";

export function SidebarFilters(props: {allManufacturers: string[], clickHandler: any}) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(10000);
    const [manufacturerInput, setManufacturerInput] = useState('');
    const [allManufacturers, setAllManufacturers] = useState(props.allManufacturers);
    const [allShown, setAllShown] = useState(false);
    const [maxShownItems, setMaxShownItems] = useState(4);


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

    return (
        <div className="catalog-content__sidebar sidebar">
            <h1 className="sidebar__title">Подбор по параметрам</h1>
            <form className="sidebar__form">
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
                                    <input type="checkbox" id={`manufacturer_${item}`} name="manufacturers" value={item} />
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