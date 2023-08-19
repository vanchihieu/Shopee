import { InputHTMLAttributes } from "react";
import type { UseFormRegister } from "react-hook-form";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    classNameInput?: string;
    classNameError?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
    // rules?: RegisterOptions;
    autoComplete?: string;
}

export default function Input({
    type,
    placeholder,
    className,
    errorMessage,
    register,
    name,
    // rules,
    autoComplete,
    classNameInput = "w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm",
    classNameError = "mt-1 text-red-600 min-h-[1rem] text-sm",
}: Props) {
    const registerResult = register && name ? register(name) : {};
    return (
        <div className={className}>
            <input
                type={type}
                className={classNameInput}
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...registerResult}
            />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    );
}
