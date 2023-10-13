import { Fragment, useRef } from "react";
import config from "src/constants/config";
import { toast } from "react-toastify";

interface Props {
    onChange?: (file?: File) => void;
}

export default function InputFile({ onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileFromLocal = event.target.files?.[0];
        if (
            fileFromLocal &&
            (fileFromLocal.size >= config.maxSizeUploadAvatar ||
                !fileFromLocal.type.includes("image"))
        ) {
            toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
                position: "top-center",
            });
        } else {
            onChange && onChange(fileFromLocal);
        }
    };
    return (
        <Fragment>
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                ref={fileInputRef}
                onChange={onFileChange}
                onClick={(
                    event: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => {
                    (event.target as HTMLInputElement).value = "";
                }}
            />
            <button
                className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
                type="button"
                onClick={handleUpload}
            >
                Chọn ảnh
            </button>
        </Fragment>
    );
}
