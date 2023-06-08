import send from '@/service/index';

export default {
    // 获取系统配置
    getSysConfig(data: any = {}) {
        return send({
            url: '/member/getSysConfig',
            method: 'get',
            data,
        });
    },

    // 获取系统变化配置
    getConfigVersion(params = {}) {
        return send({ params, url: '/member/getConfigVersion' });
    },
};
