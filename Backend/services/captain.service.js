import Captain from "../models/captain.model.js";

export const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  vehicle
}) => {

  const { color, plate, capacity, vehicleType } = vehicle;

  if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All fields are required");
  }

  const captain = await Captain.create({
    fullName: {
      firstName: firstname,
      lastName: lastname
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType
    }
  });

  return captain;
};

export const captainService = {
  createCaptain
};