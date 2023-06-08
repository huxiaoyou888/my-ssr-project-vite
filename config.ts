import type { UserConfig } from 'ssr-types';

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// @ts-ignore
const userConfig: UserConfig = {
    isVite: true,
    fePort: 10001,
    serverPort: 3005,
    assetsDir: 'assets',
    // babelExtraModule: [/query-string/, /filter-obj/, /vue3-lazyload/, /swiper/],
    // whiteList: ['query-string', 'filter-obj', 'swiper'],
    alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    // @ts-ignore
    css: () => {
        return {
            loaderOptions: {
                postcss: {
                    plugins: [tailwindcss, autoprefixer],
                },
            },
        };
    },
};

export { userConfig };
