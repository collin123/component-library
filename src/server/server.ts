import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// Path to JSON file
const dataPath = path.join(__dirname, "../../public/db.json");

// Endpoint: Get all users
app.get("/api/users", (req: Request, res: Response) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let users = JSON.parse(data);

    // Optional filters
    const { name, minAge, maxAge } = req.query;

    if (name) {
      users = users.filter((u: any) =>
        u.name.toLowerCase().includes((name as string).toLowerCase()),
      );
    }
    if (minAge) {
      users = users.filter((u: any) => u.age >= parseInt(minAge as string));
    }
    if (maxAge) {
      users = users.filter((u: any) => u.age <= parseInt(maxAge as string));
    }

    res.json(users);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
