import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import NotFound from "./components/NotFound";
import {
    createBrowserRouter,
    createRoutesFromChildren,
    RouterProvider,
    Route
} from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
        <Route index element={<Landing />} />

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
