<template>
    <router-view :asyncData="asyncData" />
</template>

<script lang="ts" setup>
import { App } from 'vue';

// 国际化
import { createI18n } from 'vue-i18n';
import en from '@/i18n/en.json';

// 图片懒加载
import VueLazyLoad from 'vue3-lazyload';

// 事件通讯
import mitt from 'mitt';

// store
import { useAppStore } from '@/store/modules/appStore';

const appStore = useAppStore();

let i18n: any;
const locale = appStore.language || 'en';
if (!appStore.i18nProp) {
    i18n = createI18n({
        locale,
        messages: {
            en,
        },
        globalInjection: true,
        legacy: false,
    });
} else {
    i18n = createI18n(appStore.i18nProp);
}

const props = defineProps<{
    ssrApp: App;
    asyncData: { value: any };
}>();

props.ssrApp
    .use(i18n, {})
    .use(VueLazyLoad, {
        // error: new URL('/public/images/common/404.jpg', import.meta.url).href,
        // loading: new URL('/public/images/common/loading.gif', import.meta.url).href,
        log: false,
    })
    .provide('mitt', mitt());
</script>

<style lang="less">
@import '@/common.less';
</style>
