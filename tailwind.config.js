module.exports = {
    content: ['./web/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {},
            skew: {},
            backgroundImage: {},
            maxWidth: {},
        },
        screens: {
            sm: '0px', // 手机端
            smm: '375px',
            // => @media (min-width: 375px) { ... }
            sml: '500px',
            // => @media (min-width: 500px) { ... }
            smx: '620px',
            // => @media (min-width: 620px) { ... }
            md: '700px', // iPad
            // => @media (min-width: 700px) { ... }
            mdl: '750px', // iPad
            // => @media (min-width: 750px) { ... }
            mdx: '756px', // iPad
            // => @media (min-width: 756px) { ... }
            lg: '850px', // PC
            // => @media (min-width: 850px) { ... }
            lgx: '1000px', // PC
            // => @media (min-width: 1000px) { ... }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
