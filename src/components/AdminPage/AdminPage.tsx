import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductType } from "../../types/productDBType";
import { AdminPageContent } from "./AdminPageContent";
import { AdminPageFooter } from "./AdminPageFooter";
import { AdminPageHeader } from "./AdminPageHeader";


export function AdminPage() {
    
    const allProducts: ProductType[] = useTypedSelector(state => state.products.list);
    
    return (
        <div className="admin-page">
            <AdminPageHeader onAdminMain={true} />
            <AdminPageContent allProducts={allProducts} />
            <AdminPageFooter />
        </div>
    );
}