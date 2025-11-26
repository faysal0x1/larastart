import Header from '@/components/frontend/Header/Header';
import Footer from '@/components/frontend/footer/Footer';

export default function WebLayout({ children, dp }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header></Header>
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
