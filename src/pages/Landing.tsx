import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Services from '../components/Services';

const Landing: React.FC = () => {
    return (
        <main className="mt-16">
            <Hero />
            <About />
            <Products />
            <Services />
        </main>
    );
};

export default Landing;