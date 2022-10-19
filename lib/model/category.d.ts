import mongoose from 'mongoose';
interface Category {
    uuid: {
        type: string;
        required: boolean;
        length: number;
        index: {
            unique: boolean;
        };
    };
    status: boolean;
    name: string;
    language?: string;
    slugs: string;
    title: string;
    description: string;
    keywords: string;
    photo?: string;
    parent: number;
    order_stt: number;
    show_top: boolean;
    show_home: boolean;
    show_right: boolean;
    show_bottom: boolean;
    level?: boolean;
}
declare const Category: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, any>, {}, {}, {}, {}, "type", Category>;
export declare const categoryModel: mongoose.Model<Category, {}, {}, {}, mongoose.Schema<Category, mongoose.Model<Category, any, any, any, any>, {}, {}, {}, {}, "type", Category>>;
export {};
