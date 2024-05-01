import express, { Router } from "express";
import cors from "cors";
import "dotenv/config";
import { api } from "./mockData.mjs";
const app = express();

app.use(cors()); // Use cors middleware

const router = Router();

router.get("/", (_, res) => {
  res.json({
    message: "Hello from express!",
  });
});

router.get("/vehicle", async (req, res) => {
  const { regNumber } = req.query;
  const response = await fetch(process.env.API_URL, {
    method: "POST",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ registrationNumber: regNumber }),
  });

  const data = await response.json();
  if (data.errors) {
    const isInMockData = api.find(
      (car) => car.registrationNumber === regNumber
    );
    if (isInMockData) {
      res.json(isInMockData);
      return;
    }
  }
  // console.log(data);
  res.json(data);
});

app.use("/api", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

export default app;
