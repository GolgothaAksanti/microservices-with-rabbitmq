import express from "express";
import userRoutes from "./routes/user-route";
// import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(5001, () => console.log("User Service running on port 5001"));
