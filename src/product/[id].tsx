import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProductById } from '../../store/productSlice';
import { addToCart } from '../../store/cartSilce';

const ProductPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    const product = useSelector((state: RootState) => state.products.selectedProduct);
    const loading = useSelector((state: RootState) => state.products.loading);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return <div className="w-[100vw] h-[100vh]"><p className="text-center text-[40px]">Loading product details...</p></div>;
    }

    if (!product) {
        return <div className="w-[100vw] h-[100vh]"><p className="text-center text-[40px]">Product not found!</p></div>;
    }

    return (
        <>

            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 p-4">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-xl font-semibold mb-4">${product.price}</p>
                        <p className="text-gray-600 mb-6">
                            Category: <span className="capitalize font-medium">{product.category_name}</span>
                        </p>
                        <button
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                            onClick={() => dispatch(addToCart(product))}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;