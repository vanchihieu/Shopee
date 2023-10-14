import { Navigate, Outlet, useRoutes } from "react-router-dom";
// import ProductList from "./pages/ProductList";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import RegisterLayout from "./layouts/RegisterLayout";
import MainLayout from "./layouts/MainLayout";
// import Profile from "./pages/Profile";
import { useContext, lazy, Suspense } from "react";
import { AppContext } from "./contexts/app.context";
import path from "./constants/path";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
import CartLayout from "./layouts/CartLayout";
import UserLayout from "./pages/User/layouts/UserLayout";
// import ChangePassword from "./pages/User/pages/ChangePassword";
// import HistoryPurchase from "./pages/User/pages/HistoryPurchase";
// import NotFound from "./pages/NotFound";

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
}
// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

const useRouteElements = () => {
    const Login = lazy(() => import("./pages/Login"));
    const ProductList = lazy(() => import("./pages/ProductList"));
    const Profile = lazy(() => import("./pages/User/pages/Profile"));
    const Register = lazy(() => import("./pages/Register"));
    const ProductDetail = lazy(() => import("./pages/ProductDetail"));
    const Cart = lazy(() => import("./pages/Cart"));
    const ChangePassword = lazy(
        () => import("./pages/User/pages/ChangePassword")
    );
    const HistoryPurchase = lazy(
        () => import("./pages/User/pages/HistoryPurchase")
    );
    const NotFound = lazy(() => import("./pages/NotFound"));

    const routeElements = useRoutes([
        {
            path: "",
            index: true,
            element: (
                <MainLayout>
                    <Suspense>
                        <ProductList />
                    </Suspense>
                </MainLayout>
            ),
        },
        {
            path: path.productDetail,
            index: true,
            element: (
                <MainLayout>
                    <Suspense>
                        <ProductDetail />
                    </Suspense>
                </MainLayout>
            ),
        },
        {
            path: "",
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.cart,
                    element: (
                        <CartLayout>
                            <Suspense>
                                <Cart />
                            </Suspense>
                        </CartLayout>
                    ),
                },
                {
                    path: path.user,
                    element: (
                        <MainLayout>
                            <Suspense>
                                <UserLayout />
                            </Suspense>
                        </MainLayout>
                    ),
                    children: [
                        {
                            path: path.profile,
                            element: (
                                <Suspense>
                                    <Profile />
                                </Suspense>
                            ),
                        },
                        {
                            path: path.changePassword,
                            element: (
                                <Suspense>
                                    <ChangePassword />
                                </Suspense>
                            ),
                        },
                        {
                            path: path.historyPurchase,
                            element: (
                                <Suspense>
                                    <HistoryPurchase />
                                </Suspense>
                            ),
                        },
                    ],
                },
            ],
        },
        {
            path: "",
            element: <RejectedRoute />,
            children: [
                {
                    path: path.login,
                    element: (
                        <RegisterLayout>
                            <Suspense>
                                <Login />
                            </Suspense>
                        </RegisterLayout>
                    ),
                },
                {
                    path: path.register,
                    element: (
                        <RegisterLayout>
                            <Suspense>
                                <Register />
                            </Suspense>
                        </RegisterLayout>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: (
                <MainLayout>
                    <Suspense>
                        <NotFound />
                    </Suspense>
                </MainLayout>
            ),
        },
    ]);
    return routeElements;
};

export default useRouteElements;
