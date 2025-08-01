import "./../css/style.css";
import "./src.js";

const garageLoadedEvent = new Event("garage-loaded");

function init() {
  garage.delete("DR13NGH");
  const cars = [
    { reg: "AA19 PPP" },
    {},
    { reg: "ER19BAD" },
    { reg: "ER19 NFD" },
    { reg: "L2WPS" },
    { reg: "AA19 SRN" },
    { rag: "AA19 SRN" },
  ];
  cars.forEach((car) => {
    garage.add(car);
  });
  const del_res = garage.delete("AA19EEE");
  console.log("T1: ", del_res);
  console.log("T2: ", garage.get("DR13NGH"));
  console.log("T3: ", garage.get("AA19SRN")["reg"] == "AA19SRN");
  window.dispatchEvent(garageLoadedEvent);
  console.log("Garage Loaded");
}

window.addEventListener("load", init);
