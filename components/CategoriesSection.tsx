import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AppDispatch, RootState } from "../store/index";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/categorySilce';
import { Link } from "react-router-dom";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ArrowLeft = (props: any) => (
    <button {...props} className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 text-gray-700 hover:text-black cursor-pointer">
        <FaArrowLeft size={30} />
    </button>
);

const ArrowRight = (props: any) => (
    <button {...props} className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 text-gray-700 hover:text-black cursor-pointer">
        <FaArrowRight size={30} />
    </button>
);

interface Category {
    category_id: string | number;
    name: string;
    category_image_url: string;
}

const CategoriesSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.categories.list) as Category[];
    const navigate = useNavigate();
    const { category } = useParams<{ category: string }>();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (category && products.length > 0) {
            const validCategory = products.some((catt) => catt.name === category);
            if (!validCategory) {
                navigate('/categories/all');
            }
        }
    }, [category, products, navigate]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        ArrowLeft: <ArrowLeft width={50} />,
        ArrowRight: <ArrowRight width={50} />,
        padding: "0",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                }
            }
        ]
    };

    return (
        <div className="pt-[100px] pb-[100px] flex flex-col container mx-auto gap-10">
            <h2 className="text-4xl font-extrabold pl-[20px] mt-2 mb-6">
                {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Categories'}
            </h2>
            <Slider {...settings} className="w-full">
                {products.map((category: Category) => (
                    <div key={category.category_id} className="px-2">
                        <div className="group flex flex-col w-full h-[200px] items-center rounded-[10px] border-[1px] relative overflow-hidden">
                            <img
                                src={category.category_image_url}
                                className="w-full h-full rounded-[10px] object-cover group-hover:scale-110 transition-all ease-in-out"
                                alt={category.name}
                            />
                            <div className='absolute w-full h-full top-0 left-0 bg-black opacity-40 rounded-[10px] z-1'></div>
                            <p className="font-extrabold text-center text-[20px] text-white mt-2 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-2">
                                {category.name}
                            </p>
                            <Link to={`/categories/${category.name}`} className="absolute top-0 left-0 w-full h-full z-3"></Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CategoriesSection;