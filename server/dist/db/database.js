"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.dialect = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const kysely_1 = require("kysely");
exports.dialect = new kysely_1.SqliteDialect({
    database: new better_sqlite3_1.default('./database.db'),
});
exports.db = new kysely_1.Kysely({
    dialect: exports.dialect,
});
