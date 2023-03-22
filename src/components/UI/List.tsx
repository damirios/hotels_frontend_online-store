export function List(props: {class?: string, list: string[], singleClass?: string, title: string}) {
    return (
        <div className={`${props.class} ${props.singleClass ? props.singleClass : ''}`}>
            <h1 className={`${props.class}__title`}>{props.title}</h1>
            <ul className={`${props.class}__list`}>
                {props.list.map((item, index) => {
                    return (
                        <li key={index} className={`${props.class}__item`}>
                            <a href="#" className={`${props.class}__link`}>{item}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}