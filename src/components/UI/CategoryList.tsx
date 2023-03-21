export function CategoryList(props: {class?: string, list: string[]}) {
    const classTitle = props.class;
    
    return (
        <div className={classTitle}>
            <h1 className={`${classTitle}__title`}>Категории</h1>
            <ul className={`${classTitle}__list`}>
                <li className={`${classTitle}__item`}>
                    <a href="#" className={`${classTitle}__link`}>Бытовая химия</a>
                </li>
                <li className={`${classTitle}__item`}>
                    <a href="#" className={`${classTitle}__link`}>Косметика и гигиена</a>
                </li>
                <li className={`${classTitle}__item`}>
                    <a href="#" className={`${classTitle}__link`}>Товары для дома</a>
                </li>
                <li className={`${classTitle}__item`}>
                    <a href="#" className={`${classTitle}__link`}>Товары для детей и мам</a>
                </li>
                <li className={`${classTitle}__item`}>
                    <a href="#" className={`${classTitle}__link`}>Посуда</a>
                </li>
            </ul>
        </div>
    );
}