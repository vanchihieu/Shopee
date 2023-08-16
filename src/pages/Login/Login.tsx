import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    return (
        <div className="bg-orange">
            <div className="px-4 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-28 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form
                            className="p-10 bg-white rounded shadow-sm"
                            onSubmit={onSubmit}
                        >
                            <div className="text-2xl">Đăng Nhập</div>
                            <div className="mt-8">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                                    placeholder="Email"
                                />
                                <div className="mt-1 text-red-600 min-h-[1rem] text-sm"></div>
                            </div>
                            <div className="mt-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full p-3 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm"
                                    placeholder="Password"
                                />
                                <div className="mt-1 text-red-600 min-h-[1rem] text-sm"></div>
                            </div>
                            <div className="mt-3">
                                <button
                                    type="submit"
                                    className="w-full px-2 py-4 text-sm text-center text-white uppercase bg-red-500 hover:bg-red-600"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="flex justify-center mt-8 ">
                                <span className="text-gray-400">
                                    Bạn chưa có tài khoản?
                                </span>
                                <Link className="text-red-400" to="/register">
                                    Đăng ký
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
