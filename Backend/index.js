import express from "express";
import dotenv from "dotenv";
import schoolRoutes from "./routes/school.route.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/schools", schoolRoutes);

app.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
