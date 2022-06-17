import express, { Application } from "express";
export const app: Application = express();
const PORT = 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
