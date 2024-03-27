import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Services from '../components/Services';

const Landing = () => {
    return (
        <main>
            <Hero />
            <About />
            <Products />
            <Services />
        </main>
    );
};

export default Landing;