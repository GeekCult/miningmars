import express, { Request, Response, NextFunction } from "express";
import path from "path";
//import cors from "cors";
const resourcesRouter = require("../routes/resources");
const inventoryRouter = require("../routes/inventory");
const userRouter = require("../routes/user");
const app = express();

//app.use(cors);
app.use(express.urlencoded({ extended: true }));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    
    try {
        res.send("index.html");
    } catch (error) {
        next(error);
    }
});

app.use("/inventory", inventoryRouter);
app.use("/resources", resourcesRouter);
app.use("/user", userRouter);

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
}); 

const PORT = process.env.PORT || 21284;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});