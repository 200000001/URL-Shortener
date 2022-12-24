"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const shortener_model_1 = require("./shortener.model");
class ShortenerController {
    constructor() {
        this.path = '/';
        this.router = express.Router();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('home/index');
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { shortcode } = req.params;
            const data = {
                shortUrl: shortcode
            };
            const urlInfo = yield shortener_model_1.default.findOne(data);
            if (urlInfo != null) {
                res.redirect(302, urlInfo.longUrl);
            }
            else {
                res.render('home/not-found');
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { url } = req.body;
            const data = {
                longUrl: url
            };
            let urlInfo = yield shortener_model_1.default.findOne(data);
            if (urlInfo == null) {
                var shortCode;
                do {
                    shortCode = this.generateRandomUrl(5);
                    urlInfo = yield shortener_model_1.default.findOne({ shortUrl: shortCode });
                } while (urlInfo !== null);
                const shortData = {
                    longUrl: url,
                    shortUrl: shortCode
                };
                const shortenerData = new shortener_model_1.default(shortData);
                urlInfo = yield shortenerData.save();
            }
            res.json({
                success: true,
                message: 'URL Shortened',
                url: urlInfo.shortUrl
            });
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.index);
        this.router.get('/:shortcode', this.get);
        this.router.post('/create', this.create);
    }
    generateRandomUrl(length) {
        const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let urlChars = "";
        for (var i = 0; i < length; i++) {
            urlChars += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        return urlChars;
    }
}
exports.default = ShortenerController;
//# sourceMappingURL=shortener.controller.js.map