// The root provides a resolver function for each API endpoint
import { v4 as uuidv4 } from 'uuid';
import { resolverPost } from './post'
import { resolverCategory } from './category'
import { categoryModel } from '../model/category'
import { postModel } from '../model/post'
import Utils from '../utils'
import config from '../config'

const resolvers: {Query: any, Mutation: any, Post: any, Category: any} = {
    Query: {
        categories: async (obj: any, args: { page: number; offset: number }) => {
            let filedCache: string = config.redisKey.categories
            let result: any
            let offset = 0
            let page = 0

            if (args.page) {
                page = args.page
                offset = args.offset ? args.offset : 5
                filedCache = config.redisKey.categories + page + '-' + offset
            }

            const dataCache: any[] = await Utils.getCacheRedis(config.redisKey.categories, filedCache)
            result = dataCache

            if (!dataCache) {
                result = await categoryModel
                    .find()
                    .skip(Math.abs((page - 1) * offset))
                    .limit(offset)

                await Utils.saveDataRedis(config.redisKey.categories, filedCache, result)
            }

            return result
        },
        posts: async (obj: any, args: { page: number; offset: number }) => {
            if (args.page) {
                const offset: number = args.offset ? args.offset : 5

                return postModel
                    .find()
                    .skip((args.page - 1) * offset)
                    .limit(offset)
            }

            return postModel.find()
        },
    },
    Mutation: {
        createCategory: async (obj: any, args: { uuid: any; status: number }) => {
            args.uuid = uuidv4()
            args.status = 1
            const newCategory = new categoryModel(args)

            return await newCategory
                .save()
                .then(async (category: any) => {
                    await Utils.delDataRedis(config.redisKey.categories)
                    return category
                })
                .catch((e: any) => console.log(e))
        },
        updateCategory: async (obj: any, args: any) => {
            return categoryModel
                .findOneAndUpdate({ _id: args.id }, args, { new: true })
                .then(async (category: any) => {
                    await Utils.delDataRedis(config.redisKey.categories)
                    return category
                })
                .catch((e: any) => console.log(e))
        },
        deleteCategory: async (obj: any, args: { id: any }) => {
            const category: { acknowledged: boolean; deletedCount: number } = await categoryModel.deleteOne({
                _id: args.id,
            })

            if (!category.deletedCount) {
                return 'Delete failed'
            }
            await Utils.delDataRedis(config.redisKey.categories)

            return 'Delete success'
        },
        createPost: async (obj: any, args: { uuid: any; status: number }) => {
            args.uuid = uuidv4()
            args.status = 1
            const newPost = new postModel(args)
            await newPost.save()

            return args
        },
        updatePost: async (obj: any, args: any) => {
            return postModel.findOneAndUpdate({ _id: args.id }, args, { new: true })
        },
        deletePost: async (obj: any, args: { id: any }) => {
            const post: { acknowledged: boolean; deletedCount: number } = await postModel.deleteOne({ _id: args.id })
            if (!post.deletedCount) {
                return 'Delete failed'
            }

            return 'Delete success'
        },
    },
    ...resolverPost,
    ...resolverCategory,
}

export { resolvers }
