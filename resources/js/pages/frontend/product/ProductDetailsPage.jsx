import WebLayout from '@/layouts/web/WebLayout';
import ProductDetails from './ProductDetails';


const ProductPage = () => {
    return (
        <WebLayout>
            {/* <Breadcrumb/> */}
            <ProductDetails />
        </WebLayout>
    );
};

export default ProductPage;