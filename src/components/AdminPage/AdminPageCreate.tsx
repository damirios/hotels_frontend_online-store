import { AdminPageFooter } from "./AdminPageFooter";
import { AdminPageHeader } from "./AdminPageHeader";
import { AdminPageProductUI } from "./AdminPageProductUI";


export function AdminPageCreate() {

    return (
        <div className="admin-page">
            <AdminPageHeader onAdminMain={false} />
            <AdminPageProductUI isEditingProduct={false} product={null} id={null} />
            <AdminPageFooter />
        </div>
    );
}