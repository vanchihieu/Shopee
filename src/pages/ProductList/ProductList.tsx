import AsideFilter from "./AsideFilter";
import SortProductList from "./SortProductList";
import Product from "./Product";
import { useQuery } from "react-query";
import useQueryParams from "src/hooks/useQueryParams";
import productApi from "src/apis/product.api";

const ProductList = () => {
    const queryParams = useQueryParams();
    const { data } = useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => {
            return productApi.getProducts(queryParams);
        },
    });

    return (
        <div className="bg-gray-200 py-6 ">
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                        <AsideFilter />
                    </div>
                    <div className="col-span-9">
                        <SortProductList />
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {data &&
                                data.data.data.products.map((product) => (
                                    <div
                                        className="col-span-1"
                                        key={product._id}
                                    >
                                        <Product product={product} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
