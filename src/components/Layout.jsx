import { useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Spinner, Stack } from '@chakra-ui/react';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    const { state } = useNavigation();

    useEffect(() => {
        globalThis.scrollTo({ top: 0, left: 0});
    }, []);

    return (
        <>
            <Navbar />
            <Stack minH='50vh' bg='gray.50'>
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
            <Footer />
        </>
    )
}

export default Layout;