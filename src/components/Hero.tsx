import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import fatogLogo from '../assets/fatog-logo.png';
import { heroData } from '../constants/data';

const Hero: React.FC = () => {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

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
            className="relative overflow-hidden h-[565px] bg-cover bg-no-repeat p-16 text-center" style={{ backgroundImage: `url('${currentHero.backgroundImage}')` }}>

            {/* Left arrow button */}
            <button className="hidden md:flex justify-center items-center absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer h-8 w-8 bg-[#1d2a4d] rounded-full z-10" onClick={() => nav('prev')}>
                <FaAngleLeft size={26} />
            </button>

            {/* Right arrow button */}
            <button className="hidden md:flex justify-center items-center absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer h-8 w-8 bg-[#1d2a4d] rounded-full z-10" onClick={() => nav('next')}>
                <FaAngleRight size={26} />
            </button>

            <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

                <div className="flex h-full items-center justify-center">
                    <div className="text-white w-full px-5">
                        {currentHero.icon}
                        <h2 className="mb-4 text-5xl md:text-6xl font-bold">{currentHero.headline}</h2>
                        <p className="mb-10 text-xl font-semibold w-1/2 mx-auto">{currentHero.tagline}</p>
                        <a
                            href="#about"
                            className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out bg-[#13c5dd] hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Logo: React.FC = () => {
    return (
        <div className='flex flex-col items-center mb-5'>
            <img src={fatogLogo} className='w-[100px] invert' alt="FATOG Logo" />
            <h1 className='flex flex-col items-center text-white font-bold'>
                <span className="text-2xl">FATOG</span>
                <span className="text-[7px]">Fishery Enterprises</span>
            </h1>
        </div>
    )
}

export default Hero;
