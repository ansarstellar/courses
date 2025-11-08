import express, { json } from "express";
import dotenv from "dotenv";
import Joi from "joi";
import { log } from "./middleware/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import courses from "./routes/courses.js";
import home from "./routes/home.js";
import c from "config";
dotenv.config();
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny"));
app.use(log);
app.use("/api/courses", courses);
app.use("/", home);

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
