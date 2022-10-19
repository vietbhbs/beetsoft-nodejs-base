import { postModel } from '../model/post'

export const resolverCategory = {
    Category: {
        posts: async (obj: { id: any }) => {
            const posts: any[] = await postModel.find()

            return posts.filter((post) => {
                return obj.id === post.categoryId
            })
        },
    },
}
