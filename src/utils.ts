import config from './config'
import { createClient } from '@redis/client'

export default class Utils {
    /**
     * Connect redis
     */
    static async connectRedis() {
        const client: any = createClient()
        client.on('error', (err: any) => console.log('Redis Client Error', err))
        await client.connect()
        return client
    }

    /**
     * check data in redis cache
     * @param field
     */
    static async getCacheRedis(key: string, field: string) {
        const redis = await this.connectRedis()
        const checkFiled = await redis.hExists(key, field)

        if (!checkFiled) {
            return false
        }

        const result = await redis.hGet(key, field)
        await redis.disconnect()
        return JSON.parse(result)
    }

    /**
     * Save data to redis
     * @param redis
     * @param field
     * @param data
     */
    static async saveDataRedis(key: string, field: string, data: any) {
        const redis = await this.connectRedis()
        await redis.hSet(key, field, JSON.stringify(data))
        await redis.expire(key, config.ttlRedisCache)
        await redis.disconnect()
    }

    /**
     * Delete field redis
     * @param redis
     * @param field
     */
    static async delDataRedis(key: string) {
        const redis = await this.connectRedis()
        await redis.del(key)
        await redis.disconnect()
    }
}
