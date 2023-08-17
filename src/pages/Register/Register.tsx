import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getRules } from "src/utils/rule";

interface FormData {
    email: string;
    password: string;
    confirm_password: string;
}

const Register = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>();
    const rules = getRules(getValues);
    const onSubmit = handleSubmit(() => {});

    return (
        <div className="bg-orange">
            <div className="px-4 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-20 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form
                            className="p-10 bg-white rounded shadow-sm"
                            onSubmit={onSubmit}
                            noValidate
                        >
                            <div className="text-2xl">Đăng Ký</div>
                            <div className="mt-8">
                                <input
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                                    placeholder="Email"
                                    {...register("email", rules.email)}
                                />
                                <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                                    {errors.email?.message}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                                    placeholder="Password"
                                    autoComplete="on"
                                    {...register("password", rules.password)}
                                />
                                <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                                    {errors.password?.message}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                                    placeholder="Confirm Password"
                                    autoComplete="on"
                                    {...register("confirm_password", {
                                        ...rules.confirm_password,
                                    })}
                                />
                                <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
                                    {errors.confirm_password?.message}
                                </div>
                            </div>
                            <div className="mt-2">
                                <button className="w-full px-2 py-4 text-sm text-center text-white uppercase bg-red-500 hover:bg-red-600">
                                    Đăng ký
                                </button>
                            </div>
                            <div className="flex justify-center mt-8 ">
                                <span className="text-gray-400">
                                    Bạn đã có tài khoản?
                                </span>
                                <Link className="text-red-400" to="/login">
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
