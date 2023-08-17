import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema, Schema } from "src/utils/rule";
import Input from "src/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = Schema;

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const onSubmit = handleSubmit(() => {});

    return (
        <div className="bg-orange">
            <div className="container">
                <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-20 lg:pr-10">
                    <div className="lg:col-span-2 lg:col-start-4">
                        <form
                            className="p-10 bg-white rounded shadow-sm"
                            onSubmit={onSubmit}
                            noValidate
                        >
                            <div className="text-2xl">Đăng Ký</div>
                            <Input
                                name="email"
                                register={register}
                                type="email"
                                placeholder="Email"
                                className="mt-8"
                                errorMessage={errors.email?.message}
                            />
                            <Input
                                name="password"
                                register={register}
                                type="password"
                                placeholder="Passowrd"
                                className="mt-2"
                                autoComplete="on"
                                errorMessage={errors.password?.message}
                            />
                            <Input
                                name="confirm_password"
                                register={register}
                                type="password"
                                autoComplete="on"
                                placeholder="Confirm_password"
                                className="mt-2"
                                errorMessage={errors.confirm_password?.message}
                            />

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
