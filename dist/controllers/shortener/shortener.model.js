"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const shortenerSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String
});
const shortenerModel = mongoose.model('Shortener', shortenerSchema);
exports.default = shortenerModel;
//# sourceMappingURL=shortener.model.js.map