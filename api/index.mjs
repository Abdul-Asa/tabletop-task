import express, { Router } from "express";
import cors from "cors";
import "dotenv/config";
import { api } from "./mockData.mjs";
const app = express();

app.use(cors()); // Use cors middleware

app.use("/vehicle/:regNumber", async (req, res) => {
  const { regNumber } = req.params;
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

if (process.env.NODE_ENV != "production") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}

export default app;
