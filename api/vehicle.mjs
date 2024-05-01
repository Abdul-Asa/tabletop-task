//Serveless function used in production
//Basically the same as the express server but serveless✨ (I have no idea what that means  )

import { api } from "./mockData.mjs";
export default async function handler(req, res) {
  const query = req.query;
  const regNumber = query.regNumber;
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
}
