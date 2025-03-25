"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const queries_1 = require("./db/queries");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "100mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
const port = process.env.PORT || 3000;
app.post("/profiles/:userId/upload", upload.single('video'), (req, res) => {
    res.status(200).send({});
});
app.post("/profiles/create", upload.single('video'), (req, res) => {
    const { name, gender, interest } = req.body;
    if (!name || !gender || !interest) {
        res.status(400).send({});
    }
    (0, queries_1.createPerson)({ first_name: name, gender, interest });
    res.status(200).send({});
});
app.get("/profiles/list", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
