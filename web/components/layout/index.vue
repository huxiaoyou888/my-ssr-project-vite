<template>
    <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta name="theme-color" content="#000000" />
            <title>{{ ctx?.seoTitle }} {{ ctx?.siteName }}</title>
            <meta name="description" :content="ctx?.seoDescription" />
            <!--            <meta name="description" :content="getDescription(ctx.request.path)" />-->
            <meta name="keywords" :content="ctx?.seoKey" />
            <!--            <meta name="keywords" :content="getKeywords(ctx.request.path)" />-->
            <!--      <slot name="remInitial" />-->
            <slot name="injectHeader" />
        </head>
        <body class="body">
            <slot name="content" />
        </body>
    </html>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

const props = defineProps(['ctx', 'config']);

const titleMap = reactive({
    '/': props.ctx?.seoTitle,
    '': '',
});

const descriptionMap = reactive({
    '/': props.ctx?.seoKey,
    '': '',
});

const keywordsMap = reactive({
    '/': props.ctx?.seoDescription,
    '': '',
});

function getTitle(path) {
    return titleMap[path];
}

function getDescription(path) {
    return descriptionMap[path];
}

function getKeywords(path) {
    return keywordsMap[path];
}
</script>
