import express, { json } from "express";
import dotenv from "dotenv";
import Joi from "joi";
dotenv.config();

const app = express();

app.use(express.json());

const courses = [
    {
        id: 1,
        name: "course1",
    },
    {
        id: 2,
        name: "course2",
    },
    {
        id: 3,
        name: "course3",
    },
];
app.get("/", (req, res) => {
    res.send("Hello,d!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course not found!");
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };

    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course with given ID not found!");

    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course["name"] = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course with given ID not found!");

    const index = courses.indexOf(course);
    if (index > -1) {
        courses.splice(index, 1);
    }

    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(course);
}

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
