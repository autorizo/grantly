"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_my_way_1 = __importDefault(require("find-my-way"));
const permissionRoutes_1 = __importDefault(require("./permissionRoutes"));
// Initialize the main router
const router = (0, find_my_way_1.default)({
    defaultRoute: (req, res) => {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    },
});
// Register nested routes
(0, permissionRoutes_1.default)(router); // Mount permission routes
exports.default = router;
