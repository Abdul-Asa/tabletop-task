//standard express server to handle the api requests
//Only used in development
//Long running server alternative to the serverless function
import express, { Router } from "express";
import cors from "cors";
import "dotenv/config";
import vehicleHandler from "./vehicle/[VRN].mjs";

const app = express();

app.use(cors()); // Use cors middleware

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "Hello from express!",
  });
});

router.get("/vehicle", vehicleHandler);

app.use("/api", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

export default app;
