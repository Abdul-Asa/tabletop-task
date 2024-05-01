import { Garage } from "./garage";
window.addEventListener("garage-loaded", start, false);

async function start() {
  //Adding VRNS to the balance out the main.js
  Garage.add({ reg: "AA19AMP" });
  Garage.add({ reg: "AA19MOT" });

  toggleLoading();

  const add_btn = document.getElementById("search-button");
  const input = document.getElementById("search");
  const carState = await getAllData(); // The state of the cars in the garage

  add_btn.addEventListener("click", () => handleSearch(input.value, carState));

  input.addEventListener("input", (e) => {
    if (e.target.value.length > 1) {
      add_btn.disabled = false;
    } else {
      add_btn.disabled = true;
    }
  });

  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleSearch(input.value);
    }
  });

  renderCount(carState);
  renderCarData(carState);
  toggleLoading();
}

// Fetch all data for cars in garage
async function getAllData() {
  const carState = [];
  const garage = Garage.getAll();

  for (const car of garage) {
    const data = await fetchCarData(car.reg);
    if (!data.errors) {
      carState.push(data);
    }
  }

  return carState;
}

// Fetch car data from API
async function fetchCarData(reg) {
  if (!reg) {
    return null;
  }

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "/api/vehicle"
      : "http://localhost:3000/api/vehicle";
  const response = await fetch(`${baseUrl}?regNumber=${reg}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

// Handle Adding car to garage
function handleSearch(input, list) {
  if (!input) {
    return;
  }
  fetchCarData(input).then((data) => {
    if (!data.errors) {
      // Find index of item with same registration number
      const index = list.findIndex(
        (item) => item.registrationNumber === data.registrationNumber
      );
      // If item exists, remove it
      if (index !== -1) {
        list.splice(index, 1);
      }
      // Add new item
      list.push(data);
      alert("Car added");
      renderCarData(list);
      renderCount(list);
    } else {
      alert("VRN not found");
    }
  });
}

// Render car data
function renderCarData(data) {
  const parentDiv = document.getElementById("root");
  parentDiv.innerHTML = "";

  for (const car of data) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const itemViewDiv = document.createElement("div");
    itemViewDiv.className = "item_view";

    itemViewDiv.innerHTML = `
      <p>Registration Number: ${car.registrationNumber}</p>
      <p>Fuel Type: ${car.fuelType}</p>
      <p>Colour: ${car.colour}</p>
      <p>Make: ${car.make}</p>
    `;

    const buttonWrap = document.createElement("div");
    buttonWrap.className = "button_wrap";

    const viewDetailButton = document.createElement("button");
    viewDetailButton.textContent = "View detail";
    viewDetailButton.addEventListener("click", () => {
      alert(JSON.stringify(car));
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      data.splice(data.indexOf(car), 1);
      alert("Car deleted");
      renderCarData(data);
      renderCount(data);
    });

    buttonWrap.appendChild(deleteButton);
    buttonWrap.appendChild(viewDetailButton);
    itemDiv.appendChild(itemViewDiv);
    itemDiv.appendChild(buttonWrap);

    parentDiv.appendChild(itemDiv);
  }
}

// Render count of cars
function renderCount(data) {
  const countElement = document.getElementById("count");
  if (data.length === 0) {
    countElement.textContent = "No cars";
    return;
  } else if (data.length === 1) {
    countElement.textContent = "1 car";
    return;
  } else {
    countElement.textContent = `${data.length} cars`;
  }
}
// toggle loading spinner
function toggleLoading() {
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display =
    loadingElement.style.display === "none" ? "block" : "none";
}
