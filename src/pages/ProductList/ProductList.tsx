import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";
import { omitBy, isUndefined } from "lodash";
import { useQuery } from "react-query";
import useQueryParams from "src/hooks/useQueryParams";
import productApi from "src/apis/product.api";
import Pagination from "src/components/Pagination";
import { ProductListConfig } from "src/types/product.type";
import categoryApi from "src/apis/category.api";

export type QueryConfig = {
    [key in keyof ProductListConfig]: string;
};

const ProductList = () => {
    const queryParams: QueryConfig = useQueryParams();
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || "1",
            limit: queryParams.limit || 20,
            sort_by: queryParams.sort_by,
            exclude: queryParams.exclude,
            name: queryParams.name,
            order: queryParams.order,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            rating_filter: queryParams.rating_filter,
            category: queryParams.category
        },
        isUndefined
    );
    const { data: productsData } = useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => {
            return productApi.getProducts(queryConfig as ProductListConfig);
        },
        keepPreviousData: true,
    });
    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: () => {
            return categoryApi.getCategories();
        },
    });

    return (
        <div className="bg-gray-200 py-6 ">
            <div className="container">
                {productsData && (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-3">
                            <AsideFilter
                                queryConfig={queryConfig}
                                categories={categoriesData?.data.data || []}
                            />
                        </div>
                        <div className="col-span-9">
                            <SortProductList
                                queryConfig={queryConfig}
                                pageSize={
                                    productsData.data.data.pagination.page_size
                                }
                            />
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                {productsData.data.data.products.map(
                                    (product) => (
                                        <div
                                            className="col-span-1"
                                            key={product._id}
                                        >
                                            <Product product={product} />
                                        </div>
                                    )
                                )}
                            </div>
                            <Pagination
                                queryConfig={queryConfig}
                                pageSize={
                                    productsData.data.data.pagination.page_size
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
