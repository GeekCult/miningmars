"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
//import cors from "cors";
var resourcesRouter = require("../routes/resources");
var inventoryRouter = require("../routes/inventory");
var userRouter = require("../routes/user");
var app = (0, express_1.default)();
//app.use(cors);
app.use(express_1.default.urlencoded({ extended: true }));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get("/", function (req, res, next) {
    try {
        res.send("index.html");
    }
    catch (error) {
        next(error);
    }
});
app.use("/inventory", inventoryRouter);
app.use("/resources", resourcesRouter);
app.use("/user", userRouter);
/* Error handler middleware */
app.use(function (err, req, res, next) {
    var statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
var PORT = process.env.PORT || 21094;
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});
