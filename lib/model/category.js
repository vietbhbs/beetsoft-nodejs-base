"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.default.Schema;
// Schema
const Category = new Schema({
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
}, {
    timestamps: true,
});
exports.categoryModel = mongoose_1.default.model('tnv_category', Category, 'tnv_category');
