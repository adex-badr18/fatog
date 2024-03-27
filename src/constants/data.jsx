import React from 'react';
import { Logo } from '../components/Hero';
import { FaHandHoldingHeart, FaClock, FaChartLine, FaRegLightbulb } from "react-icons/fa6";
import { GiCirclingFish } from "react-icons/gi";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import heroImage1 from '../assets/fish-hero.webp';
import heroImage2 from '../assets/fish-pond.jpg';
import heroImage3 from '../assets/fish-hero3.png';
import productImage1 from '../assets/fingerlings.webp';
import productImage2 from '../assets/table-sized.jpg';
import productImage3 from '../assets/dry-fish.jpg';
import productImage4 from '../assets/fish-feeds.webp';



export const menuLinks = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'About', link: '#about' },
    { id: 3, name: 'Products', link: '#products' },
    { id: 4, name: 'Services', link: '#services' },
];

export const heroData = [
    {
        backgroundImage: heroImage1,
        headline: 'Discover the Ocean Products',
        tagline: 'A wide range of premium fishery products for every Farmer.',
        icon: <Logo />

    },
    {
        backgroundImage: heroImage2,
        headline: 'Your Catch, Our Passion',
        tagline: 'Innovation and Services to The Aquaculture Sector.',
        icon: <Logo />
    },
    {
        backgroundImage: heroImage3,
        headline: 'Aquatic Farming',
        tagline: 'Get Quality Aquatic Products and Services for your Farm.',
        icon: <Logo />
    },
];

export const stats = [
    {
        icon: <FaHandHoldingHeart size={30} />,
        count: '99%',
        desc: 'Customer Satisfaction'
    },
    {
        icon: <FaClock size={30} />,
        count: '20+',
        desc: 'Years Experience'
    },
    {
        icon: <FaChartLine size={30} />,
        count: '1K+',
        desc: 'Successful Supplies'
    },
];

export const productsData = [
    {
        img: productImage1,
        title: 'Young Catfish',
        desc: 'Fingerlings, post-fingerlins, and jumbo are all available for sales.'
    },
    {
        img: productImage2,
        title: 'Catfish',
        desc: 'Medium-size and Table-size catfish are also available for sales.'
    },
    {
        img: productImage3,
        title: 'Processed Catfish',
        desc: 'We also offer processed and packaged oven-dried catfish'
    },
    {
        img: productImage4,
        title: 'Fish Feeds',
        desc: 'Purchase our well-formulated feeds to ensure a rapid growth of your fish.'
    },
];

export const servicesData = [
    {
        icon: <GiCirclingFish />,
        desc: 'Hatchery Supplies'
    },
    {
        icon: <MdOutlineCoffeeMaker />,
        desc: 'Feed Mill Production'
    },
    {
        icon: <FaRegLightbulb />,
        desc: 'Aquarism Consultancy'
    },
    {
        icon: <TbTruckDelivery />,
        desc: 'Wholesale Distribution'
    },
];