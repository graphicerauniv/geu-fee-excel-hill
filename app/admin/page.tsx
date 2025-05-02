import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin";
import AdminDashboard from "./components/admin-dashboard";

interface AdminPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPage(props: AdminPageProps) {
    const searchParams = await props.searchParams;
    const [isAdmin, user] = isAdminRequest(searchParams);

    if (!isAdmin) {
        redirect("/admin/login");
    }

    if (!user) {
        redirect("/admin/login");
    }

    return <AdminDashboard user={user} />;
}
