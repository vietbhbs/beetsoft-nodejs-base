"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
exports.mutation = `
    createCategory(
        name: String!,
        language: String,
        slugs: String!,
        title: String!,
        description: String!,
        keywords: String!,
        photo: String
        parent: Int,
        order_stt: Int!,
        show_top: Int!,
        show_home: Int!,
        show_right: Int!,
        show_bottom: Int!,
        level: Int
        ): Category,

        updateCategory(
        id: ID!,
        name: String,
        language: String,
        slugs: String,
        title: String,
        description: String,
        keywords: String,
        photo: String
        parent: Int,
        order_stt: Int,
        show_top: Int,
        show_home: Int,
        show_right: Int,
        show_bottom: Int,
        level: Int
        ): Category,

        deleteCategory(id: ID!): String

        createPost(
        language: String,
        commentStatus: String!
        status: Int!
        type: Int!
        isHot: Int!
        showTop: Int!
        categoryId: ID!
        topicId: ID!
        authorId: ID!
        name: String
        slugs: String!
        photo: String
        thumb: String
        photoData: String
        fileListen: String
        summary: String
        content: String
        title: String
        description: String
        tags: String
        source: String
        viewed: String
        viewTotal: Int
        viewDay: Int
        viewWeek: Int
        viewMonth: Int
        viewYear: Int
        note: String
        slideView: Boolean
        releaseTime: String
        outdatedAt: String
        ): Post

        updatePost(
        id: ID!,
        language: String
        commentStatus: String
        status: Int
        type: Int
        isHot: Int
        showTop: Int
        categoryId: ID
        topicId: ID
        authorId: ID
        name: String
        slugs: String
        photo: String
        thumb: String
        photoData: String
        fileListen: String
        summary: String
        content: String
        title: String
        description: String
        tags: String
        source: String
        viewed: String
        viewTotal: Int
        viewDay: Int
        viewWeek: Int
        viewMonth: Int
        viewYear: Int
        note: String
        slideView: Boolean
        releaseTime: String
        outdatedAt: String
        ): Post

        deletePost(id: ID!): String
`;
