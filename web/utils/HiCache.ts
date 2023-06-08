/**
 * @author 胡小右
 * @date 2022-12-20 17:26:28
 * @desc 本地缓存管理
 */
import Cookie from 'js-cookie';

export default class HiCache {
    static setCache<T = any>(key: string, value: T): boolean;
    static setCache<T = any>(key: string, value: T, expires: number): boolean;
    static setCache<T = any>(key: string, value: T, expires = 7): boolean {
        try {
            const val = JSON.stringify(value);
            Cookie.set(key, val, {
                expires,
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    static getCache<T = any>(key: string): T {
        let res: any;
        const val = Cookie.get(key);
        if (val && val !== 'undefined' && val !== 'null') {
            res = JSON.parse(val);
        }
        return res as T;
    }

    static deleteCache(key: string): void {
        Cookie.remove(key);
    }

    static clearCache(): void {
        const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = keys.length; i--; ) {
                Cookie.remove(keys[i]);
            }
        }
    }
}
