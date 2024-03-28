import { Outlet, useNavigation } from "react-router-dom";
import { Spinner, Stack } from '@chakra-ui/react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
    const { state } = useNavigation();
    return (
        <>
            <Navbar />
            <Stack minH='30vh' bg='gray.50'>
                {
                    state === 'loading' ?
                        <Spinner
                            thickness='4px'
                            speed='0.4s'
                            emptyColor='gray.200'
                            color='blue.300'
                            size='xl'
                            alignSelf='center'
                        /> :
                        <Outlet />
                }
            </Stack>
            <ScrollToTop />
            <Footer />
        </>
    )
}

export default Layout;