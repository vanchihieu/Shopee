import { Navigate, Outlet, useRoutes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterLayout from "./layouts/RegisterLayout";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";

const isAuthenticated = false;
// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
}
// eslint-disable-next-line react-refresh/only-export-components
function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

const useRouteElements = () => {
    const routeElements = useRoutes([
        {
            path: "",
            index: true,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            ),
        },
        {
            path: "",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/profile",
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    ),
                },
            ],
        },
        {
            path: "",
            element: <RejectedRoute />,
            children: [
                {
                    path: "/login",
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    ),
                },
                {
                    path: "/register",
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    ),
                },
            ],
        },
    ]);
    return routeElements;
};

export default useRouteElements;
