import React from 'react';
import { Logo } from '../components/Hero';
import { FaHandHoldingHeart, FaClock, FaChartLine, FaRegLightbulb } from "react-icons/fa6";
import { GiCirclingFish } from "react-icons/gi";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

type MenuType = {
    id: number;
    name: string;
    link: string;
};

export const menuLinks: MenuType[] = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'About', link: '#about' },
    { id: 3, name: 'Products', link: '#products' },
    { id: 4, name: 'Services', link: '#services' },
];

type HeroType = {
    backgroundImage: string;
    headline: string;
    tagline: string;
    icon: React.ReactNode;
}

export const heroData: HeroType[] = [
    {
        backgroundImage: '/src/assets/fish-hero.webp',
        headline: 'Discover the Ocean Products',
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

export type StatsType = {
    icon: React.ReactNode;
    count: string;
    desc: string;
};

export const stats: StatsType[] = [
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

export type ProductsType = {
    img: string;
    title: string;
    desc: string;
};

export const productsData: ProductsType[] = [
    {
        img: '/src/assets/fingerlings.webp',
        title: 'Young Catfish',
        desc: 'Fingerlings, post-fingerlins, and jumbo are all available for sales.'
    },
    {
        img: '/src/assets/table-sized.jpg',
        title: 'Catfish',
        desc: 'Medium-size and Table-size catfish are also available for sales.'
    },
    {
        img: '/src/assets/dry-fish.jpg',
        title: 'Processed Catfish',
        desc: 'We also offer processed and packaged oven-dried catfish'
    },
    {
        img: '/src/assets/fish-feeds.webp',
        title: 'Fish Feeds',
        desc: 'Purchase our well-formulated feeds to ensure a rapid growth of your fish.'
    },
];

export type ServiceType = {
    icon: React.ReactNode;
    desc: string;
};

export const servicesData: ServiceType[] = [
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