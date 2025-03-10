import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchProducts, filteredProductsByCategory } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySilce';
import FilterByCategory from '../../components/common/FilterByCategory';
import ProductList from '../../components/ProductList';
import SortByPrice from '../../components/common/SortByPrice';
import Pagination from '../../components/common/Pagination';

type CategoryParams = {
  category: string;
};

const CategoryPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { category } = useParams<CategoryParams>();
    const [searchParams] = useSearchParams();
    const pageParam = searchParams.get('page');

    const products = useSelector((state: RootState) => state.products.filteredProducts);


    const [currentPage, setCurrentPage] = useState(Number(pageParam) || 1);
    const productsPerPage = 12;

    useEffect(() => {
        dispatch(fetchCategories()); // Fetch categories

        if (!category || category === 'all') {
            dispatch(fetchProducts());
        } else {
            dispatch(filteredProductsByCategory(category));
        }
    }, [category, dispatch]);

    useEffect(() => {
        setCurrentPage(Number(pageParam) || 1);
    }, [pageParam]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        navigate(`/categories/${category || 'all'}?page=${newPage}`);
    };

    return (
        <div className="">
            <div className='w-full h-[200px] flex justify-center items-center p-2 bg-gray-700 mb-[20px]'>
                <h1 className="text-[32px] font-extrabold text-white mb-4 capitalize">
                    {category === 'all' || !category ? 'All Products' : `${category} Products`}
                </h1>
            </div>
      
            <div className="container mx-auto flex-wrap gap-[20px] justify-center items-center flex mb-6">
                <FilterByCategory selectedCategory={category} />
                <SortByPrice /> 
            </div>
            
            <div className='w-[90%] mx-auto'>
                <ProductList products={currentProducts} />
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default CategoryPage;