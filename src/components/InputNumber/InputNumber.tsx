import { InputHTMLAttributes, forwardRef } from "react";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    classNameInput?: string;
    classNameError?: string;
}

 const InputNumber = forwardRef<HTMLInputElement, Props>(
    function InputNumberInner(
        {
            className,
            errorMessage,
            classNameInput = "w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm",
            classNameError = "mt-1 text-red-600 min-h-[1rem] text-sm",
            onChange,
            ...rest
        },
        ref
    ) {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            if ((/^\d+$/.test(value) || value === "") && onChange) {
                onChange(event);
            }
        };
        return (
            <div className={className}>
                <input
                    className={classNameInput}
                    {...rest}
                    onChange={handleChange}
                    ref={ref}
                />
                <div className={classNameError}>{errorMessage}</div>
            </div>
        );
    }
);
export default InputNumber