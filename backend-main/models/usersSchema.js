const mongoose = require("mongoose");
const validator = require("validator");
const emailVerify = require('email-verify');

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("not valid email")
            }
        }
        
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    datecreated:Date,
    dateUpdated:Date
});

usersSchema.pre('save', function(next) {
    const user = this;
    emailVerify.verify(user.email, function(err, info) {
        if (err) {
            return next(err);
        }
        if (!info.success) {
            return next(new Error('Email does not exist'));
        }
        next();
    });
});

// model
const users = new mongoose.model("users",usersSchema);

module.exports = users;

