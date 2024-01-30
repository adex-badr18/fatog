import React, { useState, useEffect } from 'react';
import { FaAngleUp } from "react-icons/fa6";

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const setScroll = () => {
        const position: number = window.scrollY;
        setIsVisible(position > 50);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', setScroll);
        return () => window.removeEventListener('scroll', setScroll);
    }, []);

    return (
        isVisible &&
        <div className={`fixed bottom-8 right-8 shadow-md`}>
            <button onClick={scrollToTop} className='p-3 bg-[#13c5dd] hover:bg-[#10abc0] rounded-md cursor-pointer focus:outline-none active:outline-none'>
                <FaAngleUp size={20} color='#FFFFFF' />
            </button>
        </div>
    )
}

export default ScrollToTop;