"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
exports.query = `
        categories(page: Int, offset:Int): [Category]
        posts(page: Int, offset:Int): [Post]
`;
