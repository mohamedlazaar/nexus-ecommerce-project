import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCategories } from '../../store/categorySilce';
import { filteredProductsByCategory } from '../../store/productSlice';

interface FilterByCategoryProps {
  selectedCategory?: string;
}

interface Category {
  id: string | number;
  name: string;
}

const FilterByCategory = ({ selectedCategory }: FilterByCategoryProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.list) as Category[];

    const [category, setCategory] = useState(params.category || selectedCategory || 'all');

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
        setCategory(params.category || selectedCategory || 'all');
    
        if (params.category) {
            dispatch(filteredProductsByCategory(params.category));
        }
    }, [params.category, selectedCategory, categories, dispatch]);
    

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
        navigate(`/categories/${newCategory}`);
        dispatch(filteredProductsByCategory(newCategory));
    };

    return (
        <div className="flex gap-[10px] items-center">
            <label className='font-bold text-[16px] md:block hidden' htmlFor="category">
                Filter By Category: 
            </label>
            <select
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="all">All Categories</option>
                {categories.map((cat: Category) => (
                    <option key={cat.id} value={cat.name}>
                        {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterByCategory;