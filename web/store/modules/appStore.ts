import { defineStore } from 'pinia';
import { SystemDataType } from '@/@types/appConfig';
import XBCache from '@/utils/serverCache';
import config from '@/service/config';

export interface AppState {
    appName: string;
    language: string;
    i18nProp: any;
    systemData: SystemDataType | null;
}

export const useAppStore = defineStore('appStore', {
    state: (): AppState => {
        return {
            appName: 'App Name',
            language: 'en',
            i18nProp: null,
            systemData: null,
        };
    },
    getters: {
        GetAppName: (state: AppState) => state.appName,
        GetLanguage: (state: AppState) => state.language,
        GetI18nProp: (state: AppState) => state.i18nProp,
    },
    actions: {
        async handleGetLanguage(language?: string) {
            return (this.language = language);
        },

        async handleGetAppName(appName?: string) {
            return (this.appName = appName);
        },

        async handleGetI18nProp(i18nProp?: any) {
            return (this.i18nProp = i18nProp);
        },

        // 获取系统配置
        async handleGetSystemData(lang: string) {
            try {
                const res = await config.getConfigVersion();

                const getVersion = XBCache.get('getConfigVersion');

                const version = lang + '_' + res?.data;
                if (version === getVersion) {
                    // this.systemData = process.env.systemData && JSON.parse(process.env.systemData);
                    this.systemData = XBCache.get('systemData') && JSON.parse(XBCache.get('systemData'));
                    if (this.systemData) return this.systemData;
                }

                try {
                    const result = await config.getSysConfig();
                    if (result.code === 0) {
                        const { data } = result;
                        if (data.isUseAppUrl) data.isUseAppUrl = Boolean(data.isUseAppUrl);
                        if (data.isOpenNewCustomer) data.isOpenNewCustomer = Boolean(parseInt(data.isOpenNewCustomer));
                        if (data.isUseAndroidAppUrl) data.isUseAndroidAppUrl = Boolean(data.isUseAndroidAppUrl);
                        if (data.pop_time) data.pop_time = parseInt(data.pop_time);
                        if (data.isRechargeBindBankCard) data.isRechargeBindBankCard = Boolean(parseInt(data.isRechargeBindBankCard));
                        if (data.isPollingPayBank) data.isPollingPayBank = Boolean(parseInt(data.isPollingPayBank));
                        if (data.isOpenPromoPreferential) data.isOpenPromoPreferential = Boolean(parseInt(data.isOpenPromoPreferential));

                        this.systemData = data;

                        XBCache.set('getConfigVersion', version);
                        XBCache.set('systemData', JSON.stringify(this.systemData));
                        return version;
                    }
                } catch (e) {
                    await Promise.reject(e);
                }
            } catch (e) {
                await Promise.reject(e);
            }
        },
    },
});
