import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Document interface
interface Category {
    uuid: {
        type: string,
        required: boolean,
        length: number,
        index: { unique: boolean }
    }
    status: boolean
    name: string
    language?: string
    slugs: string
    title: string
    description: string
    keywords: string
    photo?: string
    parent: number
    order_stt: number
    show_top: boolean
    show_home: boolean
    show_right: boolean
    show_bottom: boolean
    level?: boolean
}

// Schema
const Category = new Schema<Category>(
    {
        uuid: { type: String, required: true, length: 36, index: { unique: true } },
        status: { type: Boolean, required: true },
        name: { type: String, required: true, length: 256, unique: true },
        language: { type: String, required: false, length: 50 },
        slugs: { type: String, required: true, length: 256, index: true },
        title: { type: String, required: true, length: 256 },
        description: { type: String, required: true, length: 256 },
        keywords: { type: String, required: true, length: 256 },
        photo: { type: String, required: false, length: 256, default: '/' },
        parent: { type: Number, required: true, length: 11, default: 0, index: true },
        order_stt: { type: Number, required: true, length: 11, index: true },
        show_top: { type: Boolean, required: true, index: true },
        show_home: { type: Boolean, required: true, index: true },
        show_right: { type: Boolean, required: true, index: true },
        show_bottom: { type: Boolean, required: true, index: true },
        level: { type: Boolean, required: false },
    },
    {
        timestamps: true,
    },
)

export const categoryModel = mongoose.model('tnv_category', Category, 'tnv_category')
