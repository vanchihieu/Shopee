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
    className,
    errorMessage,
    register,
    name,
    // rules,
    classNameInput = "w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm",
    classNameError = "mt-1 text-red-600 min-h-[1rem] text-sm",
    ...rest
}: Props) {
    const registerResult = register && name ? register(name) : null;
    return (
        <div className={className}>
            <input
                className={classNameInput}
                {...registerResult}
                {...rest}
            />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    );
}
