const userModel = require("../model/userModel.js");
const UserModel = require("../model/userModel.js");
const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
const isValidName = (name) => {
  if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) return true;
};

exports.createUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "body cannot be empty" });
    }
    if (!isValid(name)) {
      return res
        .status(400)
        .json({ status: false, message: "name cannot be empty" });
    }
    if (!isValidName(name)) {
      return res.status(400).json({ status: false, message: "invalid name" });
    }
    if (!age) {
      return res
        .status(400)
        .json({ status: false, message: "age cannot be empty" });
    }
    if (isNaN(age)) {
      return res
        .status(400)
        .json({ status: false, message: "age must be a number" });
    }
    if (age <= -1 || age >= 201) {
      return res
        .status(400)
        .json({ status: false, message: "this age is invalid" });
    }
    const userCreated = await UserModel.create({ name, age });

    res.status(201).json({ status: true, message: userCreated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: true, message: "Server Error" });
  }
};

exports.getuserByName = async (req, res) => {
  try {
    const { name } = req.query;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;
    if (page) {
      const numOfDoc = await userModel.countDocuments();
      if (skip > numOfDoc)
        return res
          .status(404)
          .json({ status: false, message: "Data not found" });
    }
    const objSave = {};
    name ? (objSave.name = name) : "";
    const foundedUser = await UserModel.find(objSave)
      .skip(skip)
      .limit(limit)
      .sort({ age: 1 });
    res
      .status(200)
      .json({ status: true, message: "userdata", data: foundedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: true, message: "Server Error" });
  }
};
