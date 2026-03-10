import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const captainSchema = new mongoose.Schema({

    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [2, "Last name must be at least 2 characters long"]
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },

    status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "unavailable"
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Vehicle color must be at least 3 characters long"]
        },

        plate: {
            type: String,
            required: true,
            minlength: [5, "Vehicle plate must be at least 5 characters long"]
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, "Vehicle capacity must be at least 1"]
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "auto", "motorcycle"]
        }
    },

    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }

}, { timestamps: true });


// 🔐 Generate JWT Token
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return token;
};


// 🔑 Compare Password
captainSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


// 🔒 Hash Password
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const Captain = mongoose.model("Captain", captainSchema);

export default Captain;