import Footer from '@/components/frontend/footer';
import Navbar from '@/components/frontend/nav-bar';
import ToastManager from '@/components/ToastManager.jsx';

export default function Layout({ children }) {
    return (
        <>
            {/*<Head>*/}
            {/*    <title>{pageTitle}</title>*/}
            {/*    <meta name="description" content={pageDescription} />*/}
            {/*    <link rel="canonical" href={pageCanonical} />*/}

            {/*    /!* Open Graph *!/*/}
            {/*    <meta property="og:title" content={pageTitle} />*/}
            {/*    <meta property="og:description" content={pageDescription} />*/}
            {/*    <meta property="og:image" content={pageOgImage} />*/}
            {/*    <meta property="og:url" content={pageCanonical} />*/}
            {/*    <meta property="og:type" content="website" />*/}

            {/*    /!* Twitter Card *!/*/}
            {/*    <meta name="twitter:card" content="summary_large_image" />*/}
            {/*    <meta name="twitter:title" content={pageTitle} />*/}
            {/*    <meta name="twitter:description" content={pageDescription} />*/}
            {/*    <meta name="twitter:image" content={pageOgImage} />*/}
            {/*</Head>*/}
            <div className="flex flex-col">
                <Navbar />
                <main className="flex-grow">{children}</main>

                <ToastManager />

                <Footer />
            </div>
        </>
    );
}
