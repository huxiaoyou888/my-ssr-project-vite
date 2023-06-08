import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

export default function useApp() {
    const route = useRoute();
    const router = useRouter();
    const { locale, t } = useI18n();

    return {
        route,
        router,
        locale,
        t,
    };
}
