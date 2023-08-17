import type { RegisterOptions, UseFormRegister } from "react-hook-form";
interface Props {
    type: React.HTMLInputTypeAttribute;
    errorMessage?: string;
    placeholder?: string;
    className?: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    // rules?: RegisterOptions;
    autoComplete?: string;
}

export default function Input({
    type,
    errorMessage,
    placeholder,
    className,
    name,
    register,
    // rules,
    autoComplete,
}: Props) {
    return (
        <div className={className}>
            <input
                type={type}
                className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...register(name)}
            />
            <div className="mt-1 text-red-600 min-h-[1rem] text-sm">
                {errorMessage}
            </div>
        </div>
    );
}
