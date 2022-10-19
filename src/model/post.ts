import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Document interface
interface Post {
    uuid?: string
    language?: string
    commentStatus: string
    status: number
    type: number
    isHot: number
    showTop: number
    categoryId: string
    topicId: number
    authorId: number
    name: string
    slugs: string
    photo?: string
    thumb?: string
    photoData?: string
    fileListen?: string
    summary?: string
    content?: string
    title?: string
    description?: string
    tags?: string
    source?: string
    viewed?: string
    viewTotal: number
    viewDay: number
    viewWeek: number
    viewMonth: number
    viewYear: number
    releaseTime?: any
    outdatedAt?: any
    note?: any
    slideView: boolean
}

// Schema
// @ts-ignore
const Post = new Schema<Post>(
    {
        uuid: String,
        language: String,
        commentStatus: { type: String, required: true },
        status: { type: Number, required: true },
        type: { type: Number, required: true },
        isHot: { type: Number, required: true },
        showTop: { type: Number, required: true },
        categoryId: { type: String, required: true },
        topicId: { type: Number, required: true },
        authorId: { type: Number, required: true },
        name: { type: String, required: true },
        slugs: { type: String, required: true },
        photo: String,
        thumb: String,
        photoData: String,
        fileListen: String,
        summary: String,
        content: String,
        title: String,
        description: String,
        tags: String,
        source: String,
        viewed: String,
        viewTotal: { type: Number, required: true, default: 0 },
        viewDay: { type: Number, required: true, default: 0 },
        viewWeek: { type: Number, required: true, default: 0 },
        viewMonth: { type: Number, required: true, default: 0 },
        viewYear: { type: Number, required: true, default: 0 },
        releaseTime: Date,
        outdatedAt: Date,
        note: String,
        slideView: { type: Boolean, required: true, default: true },
    },
    {
        timestamps: true,
    },
)

export const postModel = mongoose.model('tnv_posts', Post, 'tnv_posts')
