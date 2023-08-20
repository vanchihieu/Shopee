import { sortBy } from "src/constants/product";
import { QueryConfig } from "../ProductList";
import classNames from "classnames";
import { ProductListConfig } from "src/types/product.type";

interface Props {
    queryConfig: QueryConfig;
    pageSize: number;
}

export default function SortProductList({ queryConfig }: Props) {
    const { sort_by = sortBy.createdAt } = queryConfig;

    const isActiveSortBy = (
        sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
    ) => {
        return sort_by === sortByValue;
    };
    return (
        <div className="bg-gray-300/40 py-4 px-3 ">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center flex-wrap gap-2">
                    <div>Sắp xếp theo</div>
                    <button
                        className={classNames(
                            "h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center",
                            {
                                "bg-orange text-white hover:bg-orange/80":
                                    isActiveSortBy(sortBy.view),
                                "bg-white text-black hover:bg-slate-100":
                                    !isActiveSortBy(sortBy.view),
                            }
                        )}
                    >
                        Phổ biến
                    </button>
                    <button
                        className={classNames(
                            "h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center",
                            {
                                "bg-orange text-white hover:bg-orange/80":
                                    isActiveSortBy(sortBy.createdAt),
                                "bg-white text-black hover:bg-slate-100":
                                    !isActiveSortBy(sortBy.createdAt),
                            }
                        )}
                    >
                        Mới nhất
                    </button>
                    <button
                        className={classNames(
                            "h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center",
                            {
                                "bg-orange text-white hover:bg-orange/80":
                                    isActiveSortBy(sortBy.sold),
                                "bg-white text-black hover:bg-slate-100":
                                    !isActiveSortBy(sortBy.sold),
                            }
                        )}
                    >
                        Bán chạy
                    </button>
                    <select
                        className="h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 outline-none"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Giá
                        </option>
                        <option value="price:asc">Giá: Thấp đến cao</option>
                        <option value="price:desc">Giá: Cao đến thấp</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <div>
                        <span className="text-orange">1</span>
                        <span>/2</span>
                    </div>
                    <div className="ml-2">
                        <button className="px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </button>
                        <button className="px-3 h-8 rounded-tr-sm rounded-br-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
