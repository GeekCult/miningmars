import express, { Request, Response, NextFunction } from "express";
import path from "path";
const programmingLanguagesRouter = require("../routes/programmingLanguages");
const inventoryRouter = require("../routes/inventory");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    
    try {
        res.send("index.html");
    } catch (error) {
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
