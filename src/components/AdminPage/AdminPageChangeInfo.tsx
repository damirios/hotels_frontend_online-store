import { useParams } from "react-router-dom";
import { ProductType } from "../../types/productDBType";
import { getSingleProductFromLocalStorage } from "../../utilityFunctions/localStorageFunctions";
import { AdminPageHeader } from "./AdminPageHeader";
import { AdminPageFooter } from "./AdminPageFooter";
import { AdminPageProductUI } from "./AdminPageProductUI";

export function AdminPageChangeInfo() {
    const id = useParams().id;
    let productObj: {index: number, product: ProductType} | null = null;
    if (id) {
        productObj = getSingleProductFromLocalStorage(id);
    }

    const product = productObj?.product;

    return (
        <div className="admin-page">
            <AdminPageHeader onAdminMain={false} />
            {product && id ? 
                <AdminPageProductUI isEditingProduct={true} product={product} id={id} /> : null
            }
            {/* <div className="admin-page__change">
                <div className="container">
                    <div className="change-admin">
                        <div className="change-admin__title">
                            Изменение данных о товаре <span>№{params.id}</span>
                        </div>
                        <div className="change-admin__product product-admin">
                            <form onSubmit={handleSubmit}  className="product-admin__form">
                                <div className="product-admin__group product-admin__group_title">
                                    <label htmlFor="title">Название</label>
                                    <input type="text" id="title" name='title' defaultValue={product.title} required />
                                </div>
                                <div className="product-admin__group product-admin__group_manufacturer">
                                    <label htmlFor="manufacturer">Производитель</label>
                                    <input type="text" id="manufacturer" name='manufacturer' defaultValue={product.manufacturer} required />
                                </div>
                                <div className="product-admin__group product-admin__group_image-url">
                                    <label htmlFor="image-url">URL картинки</label>
                                    <input type="text" id="image-url" name='image-url' defaultValue={product.image_url} required />
                                </div>
                                <div className="product-admin__group product-admin__group_description">
                                    <label htmlFor="description">Описание</label>
                                    <textarea id="description" name='description' defaultValue={product.description} required>
                                        
                                    </textarea>
                                </div>
                                <div className="product-admin__group product-admin__group_price">
                                    <label htmlFor="price">Цена (в руб.)</label>
                                    <input type="number" id="price" name='price' defaultValue={product.price} required />
                                </div>
                                <div className="product-admin__group product-admin__group_sizeType">
                                    <label htmlFor="sizeType">Тип размера</label>
                                    <div className="sizeType__type">
                                        <input type="radio" id="sizeType1" defaultChecked={product.sizeType === 'weight'} 
                                            name='sizeType' value='weight' />
                                        <label htmlFor="sizeType_weight" >Масса в граммах</label>
                                    </div>
                                    <div className="sizeType__type">
                                        <input type="radio" id="sizeType2" defaultChecked={product.sizeType === 'volume'} 
                                            name='sizeType' value='volume' />
                                        <label htmlFor="sizeType_volume" >Объём в миллилитрах</label>
                                    </div>
                                </div>
                                <div className="product-admin__group product-admin__group_size">
                                    <label htmlFor="size">Размер</label>
                                    <input type="number" id="size" name='size' defaultValue={product.size} required />
                                </div>
                                <div className="product-admin__group product-admin__group_brand">
                                    <label htmlFor="brand">Бренд</label>
                                    <input type="text" id="brand" name='brand' defaultValue={product.brand} required />
                                </div>
                                <div className="product-admin__group product-admin__group_caretypes">
                                    <label htmlFor="caretypes">Типы ухода</label>
                                    <Select 
                                        name="careTypes"
                                        options={selectOptions}
                                        isMulti={true}
                                        value={careTypes}
                                        required
                                        onChange={handleSelectChange}
                                        // isOptionSelected={(el) => product.careTypes.includes(el.value)}
                                    />
                                </div>
                                <div className="product-admin__group product-admin__group_controls">
                                    <button type="submit">Принять изменения</button>
                                    <button type="reset">Сбросить изменения</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
            <AdminPageFooter />
        </div>
    );
}