import { Params } from '~/typings/data';
import { usePinia } from 'ssr-common-utils';
import { useAppStore } from '@/store/modules/appStore';
import ZhCnMessages from '@/i18n/zh-cn.json';
import EnMessages from '@/i18n/en.json';
import XBCache from '@/utils/serverCache';

export default async ({ store, router, ctx }: Params) => {
    const pinia = usePinia();
    const appStore = useAppStore(pinia);

    if (!__isBrowser__) {
        const locale = appStore.language || 'zh-cn';

        await appStore.handleGetSystemData(locale);

        async function loadLocaleMessagesAsync(locale) {
            let messages;

            if (locale === 'zh-cn') {
                messages = ZhCnMessages;
            } else {
                messages = EnMessages;
            }

            return messages;
        }

        async function createI18nOptions(locale) {
            const messages = await loadLocaleMessagesAsync(locale);

            return {
                locale,
                messages: {
                    [locale]: messages,
                },
                globalInjection: true,
                legacy: false,
            };
        }

        appStore.i18nProp = await createI18nOptions(locale);

        if (XBCache.get('systemData')) {
            const config = JSON.parse(XBCache.get('systemData'));
            ctx.seoTitle = config?.seoTitle;
            ctx.seoDescription = config?.seoDescription;
            ctx.seoKey = config?.seoKey;
            ctx.siteName = config?.siteName;
        }
    }
};
