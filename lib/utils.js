"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const client_1 = require("@redis/client");
class Utils {
    /**
     * Connect redis
     */
    static connectRedis() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = (0, client_1.createClient)();
            client.on('error', (err) => console.log('Redis Client Error', err));
            yield client.connect();
            return client;
        });
    }
    /**
     * check data in redis cache
     * @param field
     */
    static getCacheRedis(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const redis = yield this.connectRedis();
            const checkFiled = yield redis.hExists(key, field);
            if (!checkFiled) {
                return false;
            }
            const result = yield redis.hGet(key, field);
            yield redis.disconnect();
            return JSON.parse(result);
        });
    }
    /**
     * Save data to redis
     * @param redis
     * @param field
     * @param data
     */
    static saveDataRedis(key, field, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const redis = yield this.connectRedis();
            yield redis.hSet(key, field, JSON.stringify(data));
            yield redis.expire(key, config_1.default.ttlRedisCache);
            yield redis.disconnect();
        });
    }
    /**
     * Delete field redis
     * @param redis
     * @param field
     */
    static delDataRedis(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const redis = yield this.connectRedis();
            yield redis.del(key);
            yield redis.disconnect();
        });
    }
}
exports.default = Utils;
