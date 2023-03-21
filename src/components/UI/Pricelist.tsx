export function Pricelist(props: {class?: string}) {
    return (
        <button type="button" className={`${props.class} pricelist`}>
            <span className="pricelist__text">Прайс-лист</span>
            <img src="/images/icons/download.svg" alt="download" className="pricelist__image" />
        </button>
    );
}