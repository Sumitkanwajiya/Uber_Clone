import User from "../models/user.model.js";

export const createUser = async ({firstname, lastname, email, password,color,plate,capacity,vehicleType}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }
    const user = await User.create({
        fullname: { 
            firstname,
             lastname 
            },
        email, 
        password, 
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        }, 
    }); 
    return user;
}



export const userService = {
    createUser
 
};