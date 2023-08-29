import { useMutation, useQuery } from "react-query";
import userApi from "src/apis/user.api";
import { useForm, Controller } from "react-hook-form";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { UserSchema, userSchema } from "src/utils/rule";
import { yupResolver } from "@hookform/resolvers/yup";
import InputNumber from "src/components/InputNumber";
import { useEffect } from "react";
import DataSelect from "../User/components/DateSelect";

type FormData = Pick<
    UserSchema,
    "name" | "address" | "phone" | "date_of_birth" | "avatar"
>;

const profileSchema = userSchema.pick([
    "name",
    "address",
    "phone",
    "date_of_birth",
    "avatar",
]);

export default function Profile() {
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            avatar: "",
            date_of_birth: new Date(1990, 0, 1), // thang bat dau tu 0 -> 11
        },
        resolver: yupResolver(profileSchema),
    });

    const { data: profileData } = useQuery({
        queryKey: ["profile"],
        queryFn: userApi.getProfile,
    });
    const profile = profileData?.data.data;

    useEffect(() => {
        if (profile) {
            setValue("name", profile.name);
            setValue("phone", profile.phone);
            setValue("address", profile.address);
            setValue("avatar", profile.avatar);
            setValue(
                "date_of_birth",
                profile.date_of_birth
                    ? new Date(profile.date_of_birth)
                    : new Date(1990, 0, 1)
            );
        }
    }, [profile, setValue]);

    const updateProfileMutation = useMutation(userApi.updateProfile);

    const onSubmit = handleSubmit(async (data) => {
        console.log("🚀 ~ onSubmit ~ data:", data);

        await updateProfileMutation.mutateAsync({});
    });
    return (
        <div className="rounded-sm bg-white px-2 pb-10 md:px-7 md:pb-20 shadow ">
            <div className="border-b border-b-gray-200 py-6">
                <h1 className="text-lg font-medium capitalize text-gray-900">
                    Hồ sơ của tôi
                </h1>
                <div className="mt-1 text-sm text-gray-700">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
            </div>

            <form
                className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
                onSubmit={onSubmit}
            >
                <div className="mt-6 flex-grow pr-12 md:mt-0 md:pr-12">
                    <div className="flex flex-wrap flex-col sm:flex-row">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
                            Email
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <div className="pt-3 text-gray-700">
                                {profile?.email}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap flex-col sm:flex-row">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
                            Tên
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <Input
                                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                                name="name"
                                placeholder="Tên"
                                register={register}
                                errorMessage={errors.name?.message}
                            />
                        </div>
                    </div>

                    <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
                            Số điẹn thoại
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <Controller
                                control={control}
                                name="phone"
                                render={({ field }) => (
                                    <InputNumber
                                        classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                                        placeholder="Số điện thoại"
                                        errorMessage={errors.phone?.message}
                                        {...field}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize">
                            Địa chỉ
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <Input
                                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                                name="address"
                                placeholder="Địa chỉ"
                                register={register}
                                errorMessage={errors.address?.message}
                            />
                        </div>
                    </div>

                    <Controller
                        control={control}
                        name="date_of_birth"
                        render={({ field }) => (
                            <DataSelect
                                errorMessage={errors.date_of_birth?.message}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                    />

                    <div className="mt-2 flex flex-wrap flex-col sm:flex-row">
                        <div className="sm:w-[20%] truncate pt-3 sm:text-right capitalize"></div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <Button
                                className="flex items-center h-9 bg-orange px-5 text-center text-sm text-white hover:bg-orange/80"
                                type="submit"
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200 ">
                    <div className="flex flex-col items-center">
                        <div className="my-5 h-24 w-24">
                            <img
                                src=""
                                alt="ima"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            className="hidden"
                        />
                        <button
                            className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
                            type="button"
                        >
                            Chọn ảnh
                        </button>
                        <div className="mt-3 text-gray-400">
                            <div>Dụng lượng file tối đa 1 MB</div>
                            <div>Định dạng:.JPEG, .PNG</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
