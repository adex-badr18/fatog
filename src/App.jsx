import { requireAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import NotFound from "./components/NotFound";
import {
    createBrowserRouter,
    createRoutesFromChildren,
    RouterProvider,
    Route
} from 'react-router-dom';
import Login from "./pages/Login";
import { loader as LoginLoader } from "./pages/Login";
import SignUp from './pages/SignUp';
import ProductList from './pages/ProductList';
import { loader as ProductListLoader } from "./pages/ProductList";
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from "./pages/Dashboard";
import { loader as DashboardLoader } from "./pages/Dashboard";
import OrderCreate from "./pages/orders/OrderCreate";
import { loader as OrderCreateLoader } from "./pages/orders/OrderCreate";
import Orders from "./pages/orders/Orders";
import { loader as OrdersLoader } from "./pages/orders/Orders";
import OrderList from "./pages/orders/OrderList";
import { loader as OrderListLoader } from "./pages/orders/OrderList";
import OrderItem from "./pages/orders/OrderItem";
import { loader as OrderItemloader } from "./pages/orders/OrderItem";
import OrderSuccess from "./pages/orders/OrderSuccess";
import OrderItemUpdate from "./pages/orders/OrderItemUpdate";
import { loader as OrderItemUpdateLoader } from "./pages/orders/OrderItemUpdate";
import ProfileView from "./pages/customers/ProfileView";
import { loader as ProfileViewLoader } from "./pages/customers/ProfileView";
import ProfileForm from "./pages/customers/ProfileForm";
import ChangePassword from "./pages/customers/ChangePassword";
import Error from "./components/Error";

async function loader({ request }) {
    await requireAuth(request);
    return null;
}

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />} errorElement={<Error />}>
        <Route index element={<Landing />} />
        <Route path='login' element={<Login />} loader={LoginLoader} />
        <Route path='signup' element={<SignUp />} />
        <Route path='forgot-password' element={<ForgotPassword />} />

        <Route path='products' element={<ProductList />} loader={ProductListLoader} />

        <Route path='profile' element={<ProfileView />} loader={ProfileViewLoader} />
        <Route path='profile/update' element={<ProfileForm />} loader={loader} />
        <Route path='profile/change-password' element={<ChangePassword />} loader={loader} />

        <Route path='order/create' element={<OrderCreate />} loader={OrderCreateLoader} />
        <Route path='orders' element={<Orders />} loader={OrdersLoader} />
        <Route path='orders/success' element={<OrderSuccess />} />
        <Route path='orders/:id' element={<OrderList />} loader={OrderListLoader} />
        <Route path='orders/:id/orderlist/:id' element={<OrderItem />} loader={OrderItemloader} />
        <Route path='orders/:id/orderlist/:id/edit' loader={OrderItemUpdateLoader} element={<OrderItemUpdate />} />

        <Route path='dashboard' element={<Dashboard />} loader={DashboardLoader} />

        {/* Catch all */}
        <Route path='*' element={<NotFound />} />
    </Route>
));

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
