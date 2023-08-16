import { RegisterOptions } from "react-hook-form";

type Rules = {
    [key in "email" | "password" | "confirm_password"]?: RegisterOptions;
};

export const rules: Rules = {
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
    },
};
