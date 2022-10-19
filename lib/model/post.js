"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.default.Schema;
// Schema
// @ts-ignore
const Post = new Schema({
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
}, {
    timestamps: true,
});
exports.postModel = mongoose_1.default.model('tnv_posts', Post, 'tnv_posts');
