import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Services from '../components/Services';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from '../components/ScrollToTop';

const Landing = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            window.location.href = hash;
        }
    }, [hash]);

    return (
        <main>
            <Hero />
            <About />
            <Products />
            <Services />
            <ScrollToTop />
        </main>
    );
};

export default Landing;