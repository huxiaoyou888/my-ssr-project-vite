/**
 * @author 胡小右
 * @date 2023-05-22 23:40:50
 * @desc 服务端缓存
 */
import NodeCache from 'node-cache';
import * as process from "process";

class ServerCache {
    private cache: NodeCache;

    constructor() {
        this.cache = new NodeCache();
    }

    get<T>(key: string): T | undefined {
        // return this.cache.get<T>(key);
        return process.env[key] as T;
    }

    set<T>(key: string, value: T, ttl = 0): void {
        // this.cache.set(key, value, ttl);
        process.env[key] = value as unknown as string;
    }

    del(keys: string | string[]): void {
        // this.cache.del(keys);
        if (typeof keys === 'string') {
            delete process.env[keys];
        } else {
            keys.forEach(key => {
                delete process.env[key];
            });
        }
    }

    flushAll(): void {
        // this.cache.flushAll();
    }

    keys(): string[] {
        // return this.cache.keys();
        return Object.keys(process.env);
    }
}

const XBCache = new ServerCache();
export default XBCache;
