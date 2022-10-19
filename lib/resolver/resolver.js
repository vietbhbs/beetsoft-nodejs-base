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
exports.resolvers = void 0;
// The root provides a resolver function for each API endpoint
const uuid_1 = require("uuid");
const post_1 = require("./post");
const category_1 = require("./category");
const category_2 = require("../model/category");
const post_2 = require("../model/post");
const utils_1 = require("../utils");
const config_1 = require("../config");
const resolvers = Object.assign(Object.assign({ Query: {
        categories: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            let filedCache = config_1.default.redisKey.categories;
            let result;
            let offset = 0;
            let page = 0;
            if (args.page) {
                page = args.page;
                offset = args.offset ? args.offset : 5;
                filedCache = config_1.default.redisKey.categories + page + '-' + offset;
            }
            const dataCache = yield utils_1.default.getCacheRedis(config_1.default.redisKey.categories, filedCache);
            result = dataCache;
            if (!dataCache) {
                result = yield category_2.categoryModel
                    .find()
                    .skip(Math.abs((page - 1) * offset))
                    .limit(offset);
                yield utils_1.default.saveDataRedis(config_1.default.redisKey.categories, filedCache, result);
            }
            return result;
        }),
        posts: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            if (args.page) {
                const offset = args.offset ? args.offset : 5;
                return post_2.postModel
                    .find()
                    .skip((args.page - 1) * offset)
                    .limit(offset);
            }
            return post_2.postModel.find();
        }),
    }, Mutation: {
        createCategory: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            args.uuid = (0, uuid_1.v4)();
            args.status = 1;
            const newCategory = new category_2.categoryModel(args);
            return yield newCategory
                .save()
                .then((category) => __awaiter(void 0, void 0, void 0, function* () {
                yield utils_1.default.delDataRedis(config_1.default.redisKey.categories);
                return category;
            }))
                .catch((e) => console.log(e));
        }),
        updateCategory: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            return category_2.categoryModel
                .findOneAndUpdate({ _id: args.id }, args, { new: true })
                .then((category) => __awaiter(void 0, void 0, void 0, function* () {
                yield utils_1.default.delDataRedis(config_1.default.redisKey.categories);
                return category;
            }))
                .catch((e) => console.log(e));
        }),
        deleteCategory: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield category_2.categoryModel.deleteOne({
                _id: args.id,
            });
            if (!category.deletedCount) {
                return 'Delete failed';
            }
            yield utils_1.default.delDataRedis(config_1.default.redisKey.categories);
            return 'Delete success';
        }),
        createPost: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            args.uuid = (0, uuid_1.v4)();
            args.status = 1;
            const newPost = new post_2.postModel(args);
            yield newPost.save();
            return args;
        }),
        updatePost: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            return post_2.postModel.findOneAndUpdate({ _id: args.id }, args, { new: true });
        }),
        deletePost: (obj, args) => __awaiter(void 0, void 0, void 0, function* () {
            const post = yield post_2.postModel.deleteOne({ _id: args.id });
            if (!post.deletedCount) {
                return 'Delete failed';
            }
            return 'Delete success';
        }),
    } }, post_1.resolverPost), category_1.resolverCategory);
exports.resolvers = resolvers;
