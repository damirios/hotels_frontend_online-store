import { FilterFieldType } from "../../data/filterFields";

interface Props {
    className?: string,
    list: FilterFieldType[],
}

export function FiltersTop(props: Props) {
    const {className, list} = props;

    return (
        <div className={`${className} filters-top`}>
            <ul className='filters-top__list'>
                {list.map(item => {
                    return (
                        <li key={item.value} className="filters-top__item">
                            {item.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}