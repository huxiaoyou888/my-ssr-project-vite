import { useI18n } from 'vue-i18n';

export default function useImage() {
    return {
        getI18nImg: (name: string) => {
            const { locale } = useI18n();

            let path: string = `/images/${locale.value}/${name}`;
            return path;
        },

        getImg: (name: string) => {
            let path: string = `/images/${name}`;
            return path;
        },

        getSvg: (name: string) => {
            let path: string = `/svg/${name}`;
            return path;
        },
    };
}
