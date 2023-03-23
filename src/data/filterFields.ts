export type FilterFieldType = {
    title: string;
    value: string;
}

export const filterFields: FilterFieldType[] = [
    {title: "Уход за телом", value: "body"},
    {title: "Уход за руками", value: "hand"},
    {title: "Уход за ногами", value: "foot"},
    {title: "Уход за лицом", value: "face"},
    {title: "Уход за волосами", value: "hair"},
    {title: "Средства для загара", value: "tan"},
    {title: "Средства для бритья", value: "shaving"},
    {title: "Подарочные наборы", value: "gift"},
    {title: "Гигиеническая продукция", value: "hygiene"},
    {title: "Гигиена полости рта", value: "mouth"},
    {title: "Бумажная продукция", value: "paper"}
];