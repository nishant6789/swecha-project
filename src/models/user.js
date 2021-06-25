const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const saltRounds = 10;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name not Specifeid"],
        trim: true
    },

    lastName: {
        type: String,
        default: "",
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
        max: 10
    },
    age: {
        type: Number,
    },
    hash_password: {
        type: String,
        required: [true, "Password is required"],

    },

},{timestamps:true});

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);

    }
};

module.exports = mongoose.model("User", userSchema);