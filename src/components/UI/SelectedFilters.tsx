import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterFields } from "../../data/filterFields";

export function SelectedFilters() {
    const filters = useTypedSelector(state => state.filters);
    const {careTypes, manufacturersList, price_max, price_min} = filters;

    return (
        <div className="catalog-content__selected-filters selected-filters">
            {careTypes.length > 0 ? 
                <div className="selected-filters__care-types">
                    <h1>типы ухода: </h1>
                    <ul>
                        {careTypes.map(careType => {
                            const index = filterFields.findIndex(el => el.value === careType);
                            return <li key={careType}>{filterFields[index].title.toLowerCase()};</li>
                        })}
                    </ul>
                </div> : null
            }
            <div className="selected-filters__others">
                {manufacturersList.length > 0 ? 
                    <div className="selected-filters__manufacturer">
                        <h1>производители: </h1>
                        <ul>
                            {manufacturersList.map(manufacturer => <li key={manufacturer} >{manufacturer};</li>)}
                        </ul>
                    </div> : null
                }
                {price_max !== '' || price_min !== '' ? 
                    <div className="selected-filters__prices">
                        {price_min !== '' ? 
                            <div className="selected-filters__price">
                                минимальная цена: <span>{price_min} руб.;</span>
                            </div> : null
                        }
                        {price_max !== '' ? 
                            <div className="selected-filters__price">
                                максимальная цена: <span>{price_max} руб.</span>
                            </div> : null
                        }
                    </div> : null
                }
            </div>
        </div>
    );
}