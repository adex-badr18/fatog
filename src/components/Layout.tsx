import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <ScrollToTop />
            <Footer />
        </>
    )
}

export default Layout;