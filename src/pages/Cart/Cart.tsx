import { produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";

import purchaseApi from "src/apis/purchase.api";
import Button from "src/components/Button";
import QuantityController from "src/components/QuantityController";
import path from "src/constants/path";
import { purchasesStatus } from "src/constants/purchase";
import { Purchase } from "src/types/purchase.type";
import { formatCurrency, generateNameId } from "src/utils/utils";
import { toast } from "react-toastify";

interface ExtendedPurchase extends Purchase {
    disabled: boolean;
    checked: boolean;
}

export default function Cart() {
    const [extendedPurchases, setExtendedPurchases] = useState<
        ExtendedPurchase[]
    >([]);
    const { data: purchasesInCartData, refetch } = useQuery({
        queryKey: ["purchases", { status: purchasesStatus.inCart }],
        queryFn: () =>
            purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    });

    const updatePurchaseMutation = useMutation({
        mutationFn: purchaseApi.updatePurchase,
        onSuccess: () => {
            refetch();
        },
    });
    const deletePurchasesMutation = useMutation({
        mutationFn: purchaseApi.deletePurchase,
        onSuccess: () => {
            refetch();
        },
    });
    const buyProductsMutation = useMutation({
        mutationFn: purchaseApi.buyProducts,
        onSuccess: (data) => {
            refetch();
            toast.success(data.data.message, {
                position: "top-center",
                autoClose: 1000,
            });
        },
    });
    const location = useLocation();
    const choosenPurchaseIdFromLocation = (
        location.state as { purchaseId: string } | null
    )?.purchaseId;

    const checkedPurchases = useMemo(
        () => extendedPurchases.filter((purchase) => purchase.checked),
        [extendedPurchases]
    );
    const totalCheckedPurchasePrice = useMemo(
        () =>
            checkedPurchases.reduce((result, current) => {
                return result + current.product.price * current.buy_count;
            }, 0),
        [checkedPurchases]
    );
    const totalCheckedPurchaseSavingPrice = useMemo(
        () =>
            checkedPurchases.reduce((result, current) => {
                return (
                    result +
                    (current.product.price_before_discount -
                        current.product.price) *
                        current.buy_count
                );
            }, 0),
        [checkedPurchases]
    );
    const checkedPurchasesCount = checkedPurchases.length;
    const isAllChecked = useMemo(
        () => extendedPurchases.every((purchase) => purchase.checked),
        [extendedPurchases]
    );
    const purchasesInCart = purchasesInCartData?.data.data;
    useEffect(() => {
        setExtendedPurchases(
            purchasesInCart?.map((purchase) => ({
                ...purchase,
                disabled: false,
                checked: false,
            })) || []
        );
    }, [purchasesInCart]);

    const handleCheck =
        (purchaseIndex: number) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setExtendedPurchases(
                produce((draft) => {
                    draft[purchaseIndex].checked = event.target.checked;
                })
            );
        };

    const handleCheckAll = () => {
        setExtendedPurchases((prev) =>
            prev.map((purchase) => ({
                ...purchase,
                checked: !isAllChecked,
            }))
        );
    };

    const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
        setExtendedPurchases(
            produce((draft) => {
                draft[purchaseIndex].buy_count = value;
            })
        );
    };

    const handleQuantity = (
        purchaseIndex: number,
        value: number,
        enable: boolean
    ) => {
        if (enable) {
            const purchase = extendedPurchases[purchaseIndex];
            setExtendedPurchases(
                produce((draft) => {
                    draft[purchaseIndex].disabled = true;
                })
            );
            updatePurchaseMutation.mutate({
                product_id: purchase.product._id,
                buy_count: value,
            });
        }
    };

    const handleDelete = (purchaseIndex: number) => () => {
        const purchaseId = extendedPurchases[purchaseIndex]._id;
        deletePurchasesMutation.mutate([purchaseId]);
    };

    const handleDeleteManyPurchases = () => {
        const purchasesIds = checkedPurchases.map((purchase) => purchase._id);
        deletePurchasesMutation.mutate(purchasesIds);
    };

    const handleBuyPurchases = () => {
        if (checkedPurchases.length > 0) {
            const body = checkedPurchases.map((purchase) => ({
                product_id: purchase.product._id,
                buy_count: purchase.buy_count,
            }));
            buyProductsMutation.mutate(body);
        }
    };
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
                                            checked={isAllChecked}
                                            onChange={handleCheckAll}
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
                        {extendedPurchases.length > 0 && (
                            <div className="my-3 rounded-sm bg-white p-5 shadow">
                                {extendedPurchases?.map((purchase, index) => (
                                    <div
                                        key={purchase._id}
                                        className="first:mt-0 mt-5 grid grid-cols-12 text-center rounded-sm border border-gray-200 py-5 px-4 text-sm text-gray-500 items-center"
                                    >
                                        <div className="col-span-6">
                                            <div className="flex">
                                                <div className="flex flex-shrink-0 items-center justify-center pr-3">
                                                    <input
                                                        type="checkbox"
                                                        className="h-5 w-5 accent-orange"
                                                        checked={
                                                            purchase.checked
                                                        }
                                                        onChange={handleCheck(
                                                            index
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex">
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
                                                            className="h-20 w-20 flex-shrink-0 "
                                                        >
                                                            <img
                                                                src={
                                                                    purchase
                                                                        .product
                                                                        .image
                                                                }
                                                                alt="purchase"
                                                            />
                                                        </Link>
                                                        <div className="flex-grow px-2 pt-1 pb-2">
                                                            <Link
                                                                to={`${
                                                                    path.home
                                                                }${generateNameId(
                                                                    {
                                                                        name: purchase
                                                                            .product
                                                                            .name,
                                                                        id: purchase
                                                                            .product
                                                                            ._id,
                                                                    }
                                                                )}`}
                                                                className="line-clamp-2 text-left"
                                                            >
                                                                {
                                                                    purchase
                                                                        .product
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
                                                        value={
                                                            purchase.buy_count
                                                        }
                                                        classNameWrapper="flex items-center"
                                                        onIncrease={(value) =>
                                                            handleQuantity(
                                                                index,
                                                                value,
                                                                value <=
                                                                    purchase
                                                                        .product
                                                                        .quantity
                                                            )
                                                        }
                                                        onDecrease={(value) =>
                                                            handleQuantity(
                                                                index,
                                                                value,
                                                                value >= 1
                                                            )
                                                        }
                                                        onType={handleTypeQuantity(
                                                            index
                                                        )}
                                                        onFocusOut={(value) =>
                                                            handleQuantity(
                                                                index,
                                                                value,
                                                                value >= 1 &&
                                                                    value <=
                                                                        purchase
                                                                            .product
                                                                            .quantity &&
                                                                    value !==
                                                                        (
                                                                            purchasesInCart as unknown as Purchase[]
                                                                        )[index]
                                                                            .buy_count
                                                            )
                                                        }
                                                        disabled={
                                                            purchase.disabled
                                                        }
                                                    />
                                                </div>

                                                <div className="col-span-1">
                                                    <span className="text-orange">
                                                        ₫
                                                        {formatCurrency(
                                                            purchase.product
                                                                .price *
                                                                purchase.buy_count
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="col-span-1">
                                                    <button
                                                        className="bg-orange/95 px-4 py-3 text-white transition-colors hover:text-black hover:bg-orange/90 rounded-md"
                                                        onClick={handleDelete(
                                                            index
                                                        )}
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="sticky bottom-0 z-10 flex flex-col sm:flex-row  sm:items-center rounded-sm bg-white p-5 shadow-sm border border-gray-200 mt-5">
                    <div className="flex items-center">
                        <div className="flex flex-shrink-0 items-center justify-center">
                            <input
                                type="checkbox"
                                className="h-5 w-5 accent-orange"
                                checked={isAllChecked}
                            />
                        </div>
                        <button
                            className="mx-3 border-none bg-none"
                            onClick={handleCheckAll}
                        >
                            Chọn tất cả ({extendedPurchases.length})
                        </button>
                        <button
                            className="mx-3 border-none bg-none"
                            onClick={handleDeleteManyPurchases}
                        >
                            Xóa
                        </button>
                    </div>

                    <div className="sm:ml-auto flex flex-col sm:flex-row items-center mt-5 sm:mt-0">
                        <div>
                            <div className="flex items-center sm:justify-end">
                                <div>
                                    Tổng thanh toán ({checkedPurchasesCount} sản
                                    phẩm):{" "}
                                </div>
                                <div className="ml-2 text-2xl text-orange">
                                    ₫{formatCurrency(totalCheckedPurchasePrice)}
                                </div>
                            </div>
                            <div className="flex items-center sm:justify-end text-sm">
                                <div className="text-gray-500">Tiết kiệm</div>
                                <div className="ml-6 text-orange">
                                    ₫
                                    {formatCurrency(
                                        totalCheckedPurchaseSavingPrice
                                    )}
                                </div>
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
