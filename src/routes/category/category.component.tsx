import "./category.styles.scss";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategoriesLoding } from "../../store/categories/category.selector";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.components";

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  const isLoading = useSelector(selectCategoriesLoding);

  useEffect(() => {
    const filteredProducts = categoriesMap[category];
    console.log("effect fired calling setproducts");
    setProducts(filteredProducts);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
