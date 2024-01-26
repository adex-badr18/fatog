import { Logo } from '../components/Hero';

type MenuType = {
    id: number;
    name: string;
    link: string;
};

export const menuLinks: MenuType[] = [
    { id: 1, name: 'About', link: '#about' },
    { id: 2, name: 'Products', link: '#products' },
    { id: 3, name: 'Services', link: '#services' },
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