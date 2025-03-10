import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../store/productSlice";
import { addToCart } from "../store/cartSilce";
import { useEffect } from "react";
import ProductCard from "./common/ProductCard";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Left Arrow Component
const ArrowLeft = (props: any) => (
    <button {...props} className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 text-gray-700 hover:text-black cursor-pointer">
        <FaArrowLeft size={30} />
    </button>
);

// Right Arrow Component
const ArrowRight = (props: any) => (
    <button {...props} className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 text-gray-700 hover:text-black cursor-pointer">
        <FaArrowRight size={30} />
    </button>
);

// FeaturedProducts Component
const FeaturedProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Unique categories to ensure only one product per category
    const uniqueCategoryProducts = products.reduce((acc: any[], product: any) => {
        if (product.category_name && !acc.some((item: any) => item.category_name === product.category_name)) {
            acc.push(product);
        }
        return acc;
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centeredPadding: '0px',
                },
            },
        ],
    };

    return (
        <div className="container mx-auto pt-[0px] pb-[100px] mb-[20px]">
            <h1 className="text-4xl font-extrabold pl-[20px] mb-[30px]">Featured Products</h1>
            <Slider {...settings} className="!flex !justify-around gap-[10px] pb-[30px] !items-center">
                {uniqueCategoryProducts.slice(0, 5).map((product: any) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={() => dispatch(addToCart(product))}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default FeaturedProducts;
