import { Fragment } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.components";
import { selectCategoriesLoding } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  
  const isLoading = useSelector(selectCategoriesLoding);
  
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview title={title} products={products} key={title} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
