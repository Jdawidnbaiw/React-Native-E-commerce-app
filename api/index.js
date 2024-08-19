const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");



mongoose.connect("mongodb+srv://fooweichang2003:12345@cluster0.qquvqbx.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Conneted to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    })

app.listen(port, () => {
    console.log("Server running on port 8000");
})

const User = require("./models/user");
const Order = require("./models/order");
const { formToJSON } = require("axios");


//function to send Verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemailer transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fooweichang2003@gmail.com",
            pass: "oyhgcblmfnxdfrpg"
        }
    });

    //compose the email message
    const mailOptions = {
        from: "Klop.com",
        to: email,
        subject: "Please verify your email",
        html: `
        <h1>Please verify your email</h1>
        <a href="http://localhost:8000/verify/${verificationToken}">Click here to verify your email</a>
        `
    }

    //send the email
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("error sending verification email", error);
    }
};


//endpoint to register in the app
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("email is already registered", email);
            return res.status(400).json({ message: "Email is already registered" });
        }

        //create a new user
        const newUser = new User({
            name,
            email,
            password
        });

        //generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        //save the user to the database
        await newUser.save();

        //send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({ message: "Registration successful. Please check your email for verification.", });
    } catch (error) {
        console.log("error registering user", error);
        res.status(500).json({ message: "Registration failed" });
    }
});


//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;

        //find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Verification token is invalid" });
        }

        //mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email Verified" });
    } catch (error) {
        res.status(500).json({ message: "Email Verification failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
}

const secretKey = generateSecretKey();

//endpoint to login the user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "invalid email or password" });
        }

        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "invalid password" });
        }

        //generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        //find the user by the userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //add the new address yo yhr user's adderesses array
        user.addresses.push(address);

        //save the updated user in the backend
        await user.save();

        res.status(200).json({ message: "Address added successfully" });
    } catch (error) {
        res.status(500).json({ message: "error adding address" });
    }
})

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "error getting addresses" });
    }
})