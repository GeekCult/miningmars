"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var programmingLanguagesRouter = require("../routes/programmingLanguages");
var inventoryRouter = require("../routes/inventory");
var app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get("/", function (req, res, next) {
    try {
        res.send("index.html");
    }
    catch (error) {
        next(error);
    }
});
app.use("/resources", programmingLanguagesRouter);
app.use("/inventory", inventoryRouter);
/* Error handler middleware */
/*
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
}); */
var PORT = 3000;
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});
