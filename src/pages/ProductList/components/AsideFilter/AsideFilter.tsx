import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import path from "src/constants/path";
import { Category } from "src/types/category.type";
import classNames from "classnames";
import InputNumber from "src/components/InputNumber";
import { useForm, Controller } from "react-hook-form";
import { Schema, schema } from "src/utils/rule";
import { yupResolver } from "@hookform/resolvers/yup";
import { NoUndefinedField } from "src/types/utils.type";
import omit from "lodash/omit";
import RatingStars from "../RatingStars";
import { QueryConfig } from "src/hooks/useQueryConfig";
import { ObjectSchema } from "yup";
import { useTranslation } from "react-i18next";

interface Props {
    queryConfig: QueryConfig;
    categories: Category[];
}

type FormData = NoUndefinedField<Pick<Schema, "price_max" | "price_min">>;

const priceSchema = schema.pick(["price_min", "price_max"]);

export default function AsideFilter({ queryConfig, categories }: Props) {
    const { t } = useTranslation(["home", "product"]);
    const { category } = queryConfig;
    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            price_max: "",
            price_min: "",
        },
        resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
        shouldFocusError: false,
    });
    const navigate = useNavigate();
    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                price_max: data.price_max,
                price_min: data.price_min,
            }).toString(),
        });
    });
    const handleRemoveAll = () => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(queryConfig, [
                    "price_min",
                    "price_max",
                    "rating_filter",
                    "category",
                ])
            ).toString(),
        });
    };
    return (
        <div className="py-4">
            <Link
                to={path.home}
                className={classNames("flex items-center font-bold", {
                    "text-orange": !category,
                })}
            >
                <svg viewBox="0 0 12 10" className="mr-3 h-4 w-3 fill-current">
                    <g fillRule="evenodd" stroke="none" strokeWidth={1}>
                        <g transform="translate(-373 -208)">
                            <g transform="translate(155 191)">
                                <g transform="translate(218 17)">
                                    <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                    <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                {t("aside filter.all categories")}
            </Link>
            <div className="bg-gray-300 h-[1px] my-4 "></div>
            <ul>
                {categories.map((categoryItem) => {
                    const isActive = category === categoryItem._id;
                    return (
                        <li className="py-2 pl-2" key={categoryItem._id}>
                            <Link
                                to={{
                                    pathname: path.home,
                                    search: createSearchParams({
                                        ...queryConfig,
                                        category: categoryItem._id,
                                    }).toString(),
                                }}
                                className={classNames(" relative px-2", {
                                    "text-orange font-semibold": isActive,
                                })}
                            >
                                {isActive && (
                                    <svg
                                        viewBox="0 0 4 7"
                                        className="absolute top-1 left-[-10px] h-2 w-2 fill-orange"
                                    >
                                        <polygon points="4 3.5 0 0 0 7" />
                                    </svg>
                                )}
                                {categoryItem.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Link
                to={path.home}
                className="flex items-center font-bold mt-4 uppercase"
            >
                <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x={0}
                    y={0}
                    className="mr-3 h-4 w-3 fill-current stroke-current"
                >
                    <g>
                        <polyline
                            fill="none"
                            points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                        />
                    </g>
                </svg>
                {t("aside filter.filter search")}
            </Link>
            <div className="bg-gray-300 h-[1px] my-4" />

            <div className="my-5">
                <div>Khoản giá</div>
                <form className="mt-2" onSubmit={onSubmit}>
                    <div className="flex items-start">
                        <Controller
                            control={control}
                            name="price_min"
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        type="text"
                                        className="grow"
                                        placeholder="₫ TỪ"
                                        classNameInput="w-full p-1 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                                        {...field}
                                        onChange={(event) => {
                                            field.onChange(event);
                                            trigger("price_max");
                                        }}
                                        classNameError="hidden"
                                    />
                                );
                            }}
                        />

                        <div className="mx-2 mt-2 shrink-0">-</div>
                        <Controller
                            control={control}
                            name="price_max"
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        type="text"
                                        className="grow"
                                        placeholder="₫ ĐẾN"
                                        classNameInput="w-full p-1 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                                        {...field}
                                        onChange={(event) => {
                                            field.onChange(event);
                                            trigger("price_min");
                                        }}
                                        classNameError="hidden"
                                    />
                                );
                            }}
                        />
                    </div>
                    <div className="mt-1 text-red-600 min-h-[1rem] text-sm text-center">
                        {errors.price_min?.message}
                    </div>

                    <Button className="w-full py-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center">
                        Áp dụng
                    </Button>
                </form>
            </div>

            <div className="bg-gray-300 h-[1px] my-4" />

            <div className="text-sm">Đánh giá</div>
            <RatingStars queryConfig={queryConfig} />

            <div className="bg-gray-300 h-[1px] my-4" />

            <Button
                className="w-full py-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center"
                onClick={handleRemoveAll}
            >
                Xóa tất cả
            </Button>
        </div>
    );
}
