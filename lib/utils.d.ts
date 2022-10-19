export default class Utils {
    /**
     * Connect redis
     */
    static connectRedis(): Promise<any>;
    /**
     * check data in redis cache
     * @param field
     */
    static getCacheRedis(key: string, field: string): Promise<any>;
    /**
     * Save data to redis
     * @param redis
     * @param field
     * @param data
     */
    static saveDataRedis(key: string, field: string, data: any): Promise<void>;
    /**
     * Delete field redis
     * @param redis
     * @param field
     */
    static delDataRedis(key: string): Promise<void>;
}
