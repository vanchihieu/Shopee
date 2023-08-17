import { RegisterOptions, UseFormGetValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Rules = {
    [key in "email" | "password" | "confirm_password"]?: RegisterOptions;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
    email: {
        required: {
            value: true,
            message: "Email là bắt buộc",
        },
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Email không đúng định dạng",
        },
        maxLength: {
            value: 160,
            message: "Độ dài từ 5 - 160 ký tư",
        },
        minLength: {
            value: 5,
            message: "Độ dài từ 5 - 160 ký tư",
        },
    },

    password: {
        required: {
            value: true,
            message: "Password là bắt buộc",
        },
        maxLength: {
            value: 160,
            message: "Độ dài từ 6 - 160 ký tư",
        },
        minLength: {
            value: 6,
            message: "Độ dài từ 6 - 160 ký tư",
        },
    },
    confirm_password: {
        required: {
            value: true,
            message: "Nhập lại password là bắt buộc",
        },
        maxLength: {
            value: 160,
            message: "Độ dài từ 6 - 160 ký tư",
        },
        minLength: {
            value: 6,
            message: "Độ dài từ 6 - 160 ký tư",
        },
        validate:
            typeof getValues === "function"
                ? (value) =>
                      value === getValues("password") ||
                      "Nhập lại password không khớp"
                : undefined,
    },
});

export const schema = yup.object({
    email: yup
        .string()
        .required("Email là bắt buộc")
        .email("Email không đúng định dạng")
        .min(5, "Độ dài từ 5 - 160 ký tư")
        .max(160, "Độ dài từ 6 - 160 ký tư"),
    password: yup
        .string()
        .required("Password là bắt buộc")
        .min(6, "Độ dài từ 6 - 160 ký tư")
        .max(160, "Độ dài từ 6 - 160 ký tư"),
    confirm_password: yup
        .string()
        .required("Nhập lại password là bắt buộc")
        .min(6, "Độ dài từ 6 - 160 ký tư")
        .max(160, "Độ dài từ 6 - 160 ký tư")
        .oneOf([yup.ref("password")], "Nhập lại password không khớp"),
});

export type Schema = yup.InferType<typeof schema>;
