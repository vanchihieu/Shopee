import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authApi from "src/apis/auth.api";
import { Schema, schema } from "src/utils/rule";
import { useMutation } from "react-query";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { ErrorResponse } from "src/types/utils.type";
import Input from "src/components/Input";
import { useContext } from "react";
import { AppContext } from "src/contexts/app.context";
import Button from "src/components/Button";
import { Helmet } from "react-helmet-async";

type FormData = Pick<Schema, "email" | "password">;
const loginSchema = schema.pick(["email", "password"]);

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, "confirm_password">) =>
      authApi.login(body),
  });
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate("/");
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<FormData, "confirm_password">>
          >(error)
        ) {
          const formError = error.response?.data.data;

          if (formError?.email) {
            setError("email", {
              message: formError.email,
              type: "Server",
            });
          }
          if (formError?.password) {
            setError("password", {
              message: formError.password,
              type: "Server",
            });
          }
        }
      },
    });
  });
  return (
    <div className="bg-orange">
      <Helmet>
        <title>Đăng nhập | Shopee Clone</title>
        <meta name="description" content="Đăng nhập vào dự án Shopee Clone" />
      </Helmet>
      <div className="container ">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-28 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="p-10 bg-white rounded shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng Nhập</div>
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
                placeholder="Password"
                className="mt-2"
                autoComplete="on"
                errorMessage={errors.password?.message}
              />
              <div className="mt-3">
                <Button
                  type="submit"
                  className="flex items-center justify-center w-full px-2 py-4 text-sm text-center text-white uppercase bg-red-500 hover:bg-red-600"
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="flex justify-center mt-8 ">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
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
