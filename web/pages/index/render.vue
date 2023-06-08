<template>
    <div class="w-[100%]">
        {{ t('语言') }}
        <img :src="getImg('0.png')" alt="" />
    </div>
</template>

<script lang="ts" setup>
import useApp from '@/hooks/useApp';
import useImage from '@/hooks/useImage';

const { t } = useApp();
const { getImg } = useImage();
</script>

<style lang="scss" scoped></style>
