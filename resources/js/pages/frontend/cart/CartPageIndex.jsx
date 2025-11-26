import WebLayout from "@/layouts/web/WebLayout";
import CartPage from "./CartPage";
import { Head } from "@inertiajs/react";

export default function CartPageIndex() {
    return (
        <WebLayout>
            <Head title="Cart" />
            <CartPage />
        </WebLayout>
    );
}
