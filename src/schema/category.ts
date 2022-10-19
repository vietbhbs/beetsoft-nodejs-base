export const typeCategory = `
    type Category{
        id: ID
        uuid: String
        status: Int
        name: String
        language: String
        slugs: String
        title: String
        description: String
        keywords: String
        photo: String
        parent: String
        orderStt: Int
        showTop: Boolean
        showHome: Boolean
        showRight: Boolean
        showBottom: Boolean
        createdAt: String
        updatedAt: String
        level: Boolean,
        posts: [Post]
    }
`
