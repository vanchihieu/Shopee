import { range } from "lodash";
import { useState } from "react";

interface Props {
    onChange?: (value: Date) => void;
    value?: Date;
    errorMessage?: string;
}

export default function DataSelect({ onChange, value, errorMessage }: Props) {
    const [date, setdate] = useState({
        date: 1,
        month: 0,
        year: 1990,
    });

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value: valueFromSelect, name } = event.target
        const newDate = {
          date: value?.getDate() || date.date,
          month: value?.getMonth() || date.month,
          year: value?.getFullYear() || date.year,
          [name]: Number(valueFromSelect)
        }
        setDate(newDate)
        onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
    }

    return (
        <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
            <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
                Ngày sinh
            </div>

            <div className="sm:w-[80%] sm:pl-5">
                <div className="flex justify-between">
                    <select className="h-10 w-[32%] rounded-md border border-black/10 px-3 hover:border-orange transition-colors cursor-pointer ">
                        <option disabled>Ngày</option>
                        {range(1, 32).map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select className="h-10 w-[32%] rounded-md border border-black/10 px-3 hover:border-orange transition-colors cursor-pointer">
                        <option disabled>Tháng</option>
                        {range(0, 12).map((item) => (
                            <option value={item} key={item}>
                                {item + 1}
                            </option>
                        ))}
                    </select>
                    <select className="h-10 w-[32%] rounded-md border border-black/10 px-3 hover:border-orange transition-colors cursor-pointer">
                        <option disabled>Năm</option>
                        {range(1990, 2024).map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">
                {errorMessage}
            </div>
        </div>
    );
}
