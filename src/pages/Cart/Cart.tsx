import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import purchaseApi from "src/apis/purchase.api";
import Button from "src/components/Button";
import QuantityController from "src/components/QuantityController";
import path from "src/constants/path";
import { purchasesStatus } from "src/constants/purchase";
import { formatCurrency, generateNameId } from "src/utils/utils";

export default function Cart() {
    const { data: purchasesInCartData } = useQuery({
        queryKey: ["purchases", { status: purchasesStatus.inCart }],
        queryFn: () =>
            purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    });
    const purchasesInCart = purchasesInCartData?.data.data;
    console.log("🚀 ~ Cart ~ purchasesInCart:", purchasesInCart);

    return (
        <div className="bg-neutral-100 py-16">
            <div className="container">
                <div className="overflow-hidden">
                    <div className="min-w-[1000px]">
                        <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
                            <div className="col-span-6">
                                <div className="flex items-center">
                                    <div className="flex flex-shrink-0 items-center justify-center pr-3">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 accent-orange"
                                        />
                                    </div>
                                    <div className="flex-grow text-black">
                                        Sản phẩm
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="grid grid-cols-5 text-center">
                                    <div className="col-span-2">Đơn giá</div>
                                    <div className="col-span-1">Số lượng</div>
                                    <div className="col-span-1">Số tiền</div>
                                    <div className="col-span-1">Thao tác</div>
                                </div>
                            </div>
                        </div>

                        <div className="my-3 rounded-sm bg-white p-5 shadow">
                            {purchasesInCart?.map((purchase, index) => (
                                <div
                                    key={purchase._id}
                                    className="first:mt-0 mt-5 grid grid-cols-12 text-center rounded-sm border border-gray-200 py-5 px-4 text-sm text-gray-500"
                                >
                                    <div className="col-span-6">
                                        <div className="flex">
                                            <div className="flex flex-shrink-0 items-center justify-center pr-3">
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 accent-orange"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex">
                                                    <Link
                                                        to={`${
                                                            path.home
                                                        }${generateNameId({
                                                            name: purchase
                                                                .product.name,
                                                            id: purchase.product
                                                                ._id,
                                                        })}`}
                                                        className="h-20 w-20 flex-shrink-0"
                                                    >
                                                        <img
                                                            src={
                                                                purchase.product
                                                                    .image
                                                            }
                                                            alt="purchase"
                                                        />
                                                    </Link>
                                                    <div className="flex-grow px-2 pt-1 pb-2">
                                                        <Link
                                                            to={`${
                                                                path.home
                                                            }${generateNameId({
                                                                name: purchase
                                                                    .product
                                                                    .name,
                                                                id: purchase
                                                                    .product
                                                                    ._id,
                                                            })}`}
                                                            className="line-clamp-2"
                                                        >
                                                            {
                                                                purchase.product
                                                                    .name
                                                            }
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="grid grid-cols-5 items-center">
                                            <div className="col-span-2">
                                                <div className="flex items-center justify-center">
                                                    <span className="text-gray-300 line-through">
                                                        ₫
                                                        {formatCurrency(
                                                            purchase.product
                                                                .price_before_discount
                                                        )}
                                                    </span>
                                                    <span className="ml-3">
                                                        ₫
                                                        {formatCurrency(
                                                            purchase.product
                                                                .price
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-span-1">
                                                <QuantityController
                                                    max={
                                                        purchase.product
                                                            .quantity
                                                    }
                                                    value={purchase.buy_count}
                                                    classNameWrapper="flex items-center"
                                                />
                                            </div>

                                            <div className="col-span-1">
                                                <span className="text-orange">
                                                    ₫
                                                    {formatCurrency(
                                                        purchase.product.price *
                                                            purchase.buy_count
                                                    )}
                                                </span>
                                            </div>

                                            <div className="col-span-1">
                                                <button className="bg-orange/95 px-4 py-3 text-white transition-colors hover:text-black hover:bg-orange/90 rounded-md">
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 z-10 flex flex-col sm:flex-row  sm:items-center rounded-sm bg-white p-5 shadow-sm border border-gray-200 mt-5">
                    <div className="flex items-center">
                        <div className="flex flex-shrink-0 items-center justify-center">
                            <input
                                type="checkbox"
                                className="h-5 w-5 accent-orange"
                            />
                        </div>
                        <button className="mx-3 border-none bg-none">
                            Chọn tất cả
                        </button>
                        <button className="mx-3 border-none bg-none">
                            Xóa
                        </button>
                    </div>

                    <div className="sm:ml-auto flex flex-col sm:flex-row items-center mt-5 sm:mt-0">
                        <div>
                            <div className="flex items-center sm:justify-end">
                                <div>Tổng thanh toán (0 sản phẩm): </div>
                                <div className="ml-2 text-2xl text-orange">
                                    138000
                                </div>
                            </div>
                            <div className="flex items-center sm:justify-end text-sm">
                                <div className="text-gray-500">Tiết kiệm</div>
                                <div className="ml-6 text-orange">138000</div>
                            </div>
                        </div>
                        <Button className="mt-5 sm:mt-0  flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 ">
                            Mua hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
