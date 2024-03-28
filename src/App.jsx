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

async function loader({ request }) {
    await requireAuth(request);
    return null;
}

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path='login' element={<Login />} loader={LoginLoader} />
        <Route path='signup' element={<SignUp />} />
        <Route path='forgot-password' element={<ForgotPassword />} />

        <Route path='products' element={<ProductList />} loader={ProductListLoader} />

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
