"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
const _routes_1 = __importDefault(require("@routes")); // Import the main router
// Create the server
const server = http_1.default.createServer((req, res) => {
    const { pathname } = (0, url_1.parse)(req.url || '', true);
    _routes_1.default.lookup(req, res); // Delegate requests to the router
});
// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
