const garage = {
  count: 1,
  cars: [{ reg: "AA19 AAA" }, { reg: "AA19EEE" }],
};
//fixed the spelling errors rag to reg, removed the {}
//fixed the functions
//added the getAll and getCount functions
export const Garage = {
  add(value) {
    const reg = value.reg?.replace(/\s/g, "") || null;
    if (!reg) {
      return false;
    }
    garage.cars.push({ reg });
    garage.count++;
  },

  delete(input) {
    const reg = input.replace(/\s/g, "");
    const index = garage.cars.findIndex((car) => car.reg === reg);
    if (index === -1) {
      return false;
    }
    garage.cars.splice(index, 1);
    garage.count--;
    return true;
  },

  get(input) {
    const reg = input.replace(/\s/g, "");
    const found = garage.cars.findIndex((car) => car.reg === reg);
    if (found === -1) {
      return {};
    }
    return garage.cars[found];
  },

  getAll() {
    return garage.cars;
  },

  getCount() {
    return garage.count;
  },
};
