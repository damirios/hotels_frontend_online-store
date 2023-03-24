export interface ProductType {
    image_url: string,
    title: string,
    sizeType: sizeTypes.volume | sizeTypes.weight,
    size: number,
    barcode: string,
    manufacturer: string,
    brand: string,
    description: string,
    price: number,
    careTypes: string[]
}

export enum sizeTypes {
    volume = 'volume',
    weight = 'weight'
}