const userModel = require("../models/userModel");
// const msgModel = require('../models/messageModel')
const validator = require("../validator/validator");
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  try {
    const requestBody = req.body;
    const { name, contacts, phone, secretKey } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Empty body not accepted." });
    }

    if (!validator.isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }
    if (!validator.isValid(contacts)) {
      return res
        .status(400)
        .send({ status: false, message: "contacts is required" });
    }
    if (!validator.isValid(phone)) {
      return res
        .status(400)
        .send({ status: false, message: "phone is required" });
    }

    if (!validator.isValid(secretKey)) {
      return res
        .status(400)
        .send({ status: false, message: "secretKey is required" });
    }

    const isPhoneAlreadyUsed = await userModel.findOne({ phone });

    if (isPhoneAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, message: "phone is already used" });
    }

    const saveUserData = await userModel.create(requestBody);
    return res
      .status(201)
      .send({ status: true, message: "User created", data: saveUserData });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};



const loginUser = async (req, res) => {
  try {
    const requestBody = req.body;
    const { phone, secretKey } = requestBody;

    // Validation starts
    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide login details" });
    }
    if (!validator.isValid(phone)) {
      return res
        .status(400)
        .send({ status: false, message: "phone Id is required" });
    }

    if (!validator.isValid(secretKey)) {
      return res
        .status(400)
        .send({ status: false, message: "secretKey is required" });
    }

    const findUser = await userModel.findOne({phone});

    //console.log(findUser)

    if (!findUser) {
      return res.status(400).send({ status: false, message: "User not found" });
    }

    if (findUser.secretKey != secretKey) {
      return res
        .status(400)
        .send({ status: false, message: "Wrong SecretKey" });
    }
    //Creating JWT token through userId.
    const userId = findUser._id;
    const token = jwt.sign(
      {
        userId: userId,
        iat: Math.floor(Date.now() / 1000), //time of issuing the token.
        exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 70, //setting token expiry time limit.
      },
      "SecretKey")

      return res.status(200).send({
        status: true,
        message: `user login successfull `,
        data: {
            userId,
            token
        }
    });


    
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = { createUser, loginUser };
