"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const beneficiaries_routes_1 = __importDefault(require("./routes/beneficiaries.routes"));
const transfer_route_1 = __importDefault(require("./routes/transfer.route"));
const cors_1 = __importDefault(require("cors"));
const { PORT } = dbConfig_1.default;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/user', users_routes_1.default);
app.use('/beneficiaries', beneficiaries_routes_1.default);
app.use('/transfer', transfer_route_1.default);
app.get('/', (req, res) => {
    return res.send('Hello World!');
});
config_1.db.sync({}).then(() => {
    console.log('Database is connected');
}).catch((err) => {
    console.log(err);
});
const port = PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
