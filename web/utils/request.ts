import axios from 'axios';

// @ts-ignore
import md5 from 'nano-md5';
import queryString from 'query-string';

import { usePinia } from 'ssr-common-utils';

import { useAppStore } from '@/store';
import { useUserStore } from '@/store/modules/userStore';

axios.defaults.timeout = 30000;
// @ts-ignore
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

axios.defaults.withCredentials = true;

// 创建一个axios实例
let instance = axios.create({
    timeout: 50000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

// 将 Object 转 str eg {a:1, b: 1} -> a=1&b=1
export function formatObjectToString(obj: any = {}, url: string, method: string) {
    let arr: any[] = [];
    if (url.indexOf('?') !== -1 && method === 'get') {
        const urlHash = url.split('?')[1];
        obj = { ...obj, ...queryString.parse(urlHash) };
    }
    const newArray = Object.keys(obj).sort();
    newArray.forEach(item => {
        arr.push(`${item}=${obj[item]}`);
    });
    return arr.join('&');
}

// Request
instance.interceptors.request.use(
    async (config: any) => {
        const pinia = usePinia();
        const appStore = useAppStore(pinia); // 非 setup 上下文调用时需要手动传入实例

        let token = '';

        if (token ?? '' !== '') {
            config.headers.Authorization = 'Bearer ' + token;
        }

        if (config.url.includes('refreshToken')) {
            config.headers.Authorization = '';
        }

        if (__isBrowser__) {
            const ua = navigator.userAgent;

            // 获取设备类型
            const isMobile = /Mobile/.test(ua);
            if (isMobile) {
                config.headers['device'] = 'H5';
            } else {
                config.headers['device'] = 'Pc';
            }
        }
        config.headers['language'] = appStore.language || 'en';

        // 公共参数
        let data: any = {
            // timestamp: new Date().getTime(),
        };
        if (config.method == 'post') {
            data = {
                ...data,
                ...config.data,
            };
        } else if (config.method == 'get') {
            data = {
                ...data,
                ...config.params,
            };
        }

        if (config.method == 'post') {
            config.data = data;
        } else if (config.method == 'get') {
            config.params = data;
        }

        data['timestamp'] = new Date().getTime();

        config.headers['sign'] = md5(
            formatObjectToString(
                {
                    ...data,
                    device: config.headers.device,
                },
                config.url,
                config.method
            )
        );
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// Response
instance.interceptors.response.use(
    async response => {
        //这里根据后台返回来设置
        let error = {
            message: '',
        };
        const { code, data, msg } = response.data;
        error.message = msg;
        if (code == 0) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(error.message);
        }
    },
    async error => {
        return Promise.reject(error.message);
    }
);

export default instance;
