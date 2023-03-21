export function Logo(props: {class?: string}) {
    return (
        <a href="#" className={`${props.class} logo`}>
            <img src="/images/icons/logo.svg" alt="logo" className="logo__image" />
        </a>
    );
}