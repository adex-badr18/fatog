import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import fatogLogo from '../assets/fatog-logo.png';
import { Link } from 'react-router-dom';

// import hero1 from '../assets/fish-hero.webp';
// import hero2 from '../assets/fish-hero2.webp';

type HeroType = {
    backgroundImage: string;
    headline: string;
    tagline: string;
    icon: React.ReactNode;
}
const Hero: React.FC = () => {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const heroData: HeroType[] = [
        {
            backgroundImage: '/src/assets/fish-hero.webp',
            headline: 'Discover the Ocean Delicacies',
            tagline: 'A wide range of premium fishery products for every Farmer.',
            icon: <Logo />

        },
        {
            backgroundImage: '/src/assets/fish-pond.jpg',
            headline: 'Your Catch, Our Passion',
            tagline: 'Innovation and Services to The Aquaculture Sector.',
            icon: <Logo />
        },
        {
            backgroundImage: '/src/assets/fish-hero3.png',
            headline: 'Aquatic Farming',
            tagline: 'Get Quality Aquatic Products and Services for your Farm.',
            icon: <Logo />
        },
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Increment the index, and loop back to 0 if it exceeds the array length
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroData.length);
        }, 10000); // Change every 10 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [heroData]);

    const currentHero = heroData[currentHeroIndex];

    const nav = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            setCurrentHeroIndex((prevIndex) => (prevIndex - 1 + heroData.length) % heroData.length);
        } else if (direction === 'next') {
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroData.length);
        }
    };

    return (
        <section
            className="relative overflow-hidden h-[565px] bg-cover bg-no-repeat p-12 text-center" style={{ backgroundImage: `url('${currentHero.backgroundImage}')` }}>

            {/* Left arrow button */}
            <button className="hidden md:flex justify-center items-center absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer h-8 w-8 bg-blue-500 rounded-full z-10" onClick={() => nav('prev')}>
                <FaAngleLeft size={26} />
            </button>

            {/* Right arrow button */}
            <button className="hidden md:flex justify-center items-center absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer h-8 w-8 bg-blue-500 rounded-full z-10" onClick={() => nav('next')}>
                <FaAngleRight size={26} />
            </button>

            <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

                <div className="flex h-full items-center justify-center">
                    <div className="text-white w-full">
                        {currentHero.icon}
                        <h2 className="mb-4 text-4xl font-semibold">{currentHero.headline}</h2>
                        <p className="mb-6 text-xl font-semibold w-1/2 mx-auto">{currentHero.tagline}</p>
                        <Link
                            to="#about"
                            className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out bg-blue-500 hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Logo: React.FC = () => {
    return (
        <div className='flex flex-col items-center mb-5'>
            <img src={fatogLogo} className='w-14 invert' alt="FATOG Logo" />
            <h1 className='text-white font-bold text-xl'>FATOG</h1>
        </div>
    )
}

export default Hero;
