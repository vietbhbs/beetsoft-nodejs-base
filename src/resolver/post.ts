import { categoryModel } from '../model/category'

export const resolverPost = {
    Post: {
        category: async (obj: { categoryId: any }) => {
            const categories: any[] = await categoryModel.find()

            return categories.find((category) => {
                return obj.categoryId === category.id
            })
        },
    },
}
