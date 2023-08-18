import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import Input from "src/components/Input";
import { omit } from "lodash";

import { schema, Schema } from "src/utils/rule";
import { registerAccount } from "src/apis/auth.api";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { ErrorResponse } from "src/types/utils.type";
import { useContext } from "react";
import { AppContext } from "src/contexts/app.context";
import Button from "src/components/Button";
type FormData = Schema;

const Register = () => {
    const { setIsAuthenticated } = useContext(AppContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, "confirm_password">) =>
            registerAccount(body),
    });
    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ["confirm_password"]);
        registerAccountMutation.mutate(body, {
            onSuccess: () => {
                setIsAuthenticated(true);
                navigate("/");
            },
            onError: (error) => {
                if (
                    isAxiosUnprocessableEntityError<
                        ErrorResponse<Omit<FormData, "confirm_password">>
                    >(error)
                ) {
                    const formError = error.response?.data.data;
                    if (formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(
                                key as keyof Omit<FormData, "confirm_password">,
                                {
                                    message:
                                        formError[
                                            key as keyof Omit<
                                                FormData,
                                                "confirm_password"
                                            >
                                        ],
                                    type: "Server",
                                }
                            );
                        });
                    }
                    // if (formError?.email) {
                    //     setError("email", {
                    //         message: formError.email,
                    //         type: "Server",
                    //     });
                    // }
                    // if (formError?.password) {
                    //     setError("password", {
                    //         message: formError.password,
                    //         type: "Server",
                    //     });
                    // }
                }
            },
        });
    });

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
                                <Button
                                    className="w-full px-2 py-4 text-sm text-center text-white uppercase bg-red-500 hover:bg-red-600 flex justify-center items-center"
                                    disabled={registerAccountMutation.isLoading}
                                    isLoading={
                                        registerAccountMutation.isLoading
                                    }
                                >
                                    Đăng ký
                                </Button>
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
